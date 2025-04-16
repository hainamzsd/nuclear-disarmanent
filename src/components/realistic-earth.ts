import * as THREE from "three"
import type { RealisticEarth } from "./types"
import { vertexShader } from "./vertex-shader" 
import { fragmentShader } from "./fragment-shader" 

// Helper function to load textures
const loadTexture = async (url: string): Promise<THREE.Texture> => {
  return new Promise((resolve) => {
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      url,
      (texture) => {
        resolve(texture)
      },
      undefined,
      (err) => {
        console.error("An error occurred while loading texture:", url, err)
        resolve(new THREE.Texture()) // Resolve with an empty texture to avoid blocking
      },
    )
  })
}

export async function createRealisticEarth(scene: THREE.Scene): Promise<RealisticEarth> {
  // Create a group for the realistic Earth with proper axial tilt
  const group = new THREE.Group()
  group.rotation.z = (23.5 / 360) * 2 * Math.PI
  scene.add(group)

  // Add directional light (sun)
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.8)
  dirLight.position.set(-50, 0, 30)
  group.add(dirLight)

  // Load all textures in parallel
  try {
    const [albedoMap, bumpMap, cloudsMap, oceanMap, lightsMap] = await Promise.all([
      loadTexture("/Albedo.jpg"),
      loadTexture("/Bump.jpg"),
      loadTexture("/Clouds.png"),
      loadTexture("/Ocean.png"),
      loadTexture("/night_lights_modified.png"),
    ])

    // Set proper color space
    albedoMap.colorSpace = THREE.SRGBColorSpace

    // Create Earth
    const earthGeo = new THREE.SphereGeometry(100, 64, 64)
    const earthMat = new THREE.MeshStandardMaterial({
      map: albedoMap,
      bumpMap: bumpMap,
      bumpScale: 0.03,
      roughnessMap: oceanMap,
      metalness: 0.1,
      metalnessMap: oceanMap,
      emissiveMap: lightsMap,
      emissive: new THREE.Color(0xffff88),
      emissiveIntensity: 0.5,
    })

    const earth = new THREE.Mesh(earthGeo, earthMat)
    group.add(earth)

    // Create clouds
    const cloudGeo = new THREE.SphereGeometry(101, 64, 64)
    const cloudsMat = new THREE.MeshStandardMaterial({
      alphaMap: cloudsMap,
      transparent: true,
      opacity: 0.8,
    })

    const clouds = new THREE.Mesh(cloudGeo, cloudsMat)
    group.add(clouds)

    // Set initial rotation
    earth.rotation.y = -0.3
    clouds.rotation.y = -0.3

    // Create atmosphere
    const atmosGeo = new THREE.SphereGeometry(125, 64, 64)
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        atmOpacity: { value: 0.7 },
        atmPowFactor: { value: 4.1 },
        atmMultiplier: { value: 9.5 },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })

    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat)
    group.add(atmosphere)

    // Custom shader for Earth to show night lights and cloud shadows
    earthMat.onBeforeCompile = (shader) => {
      shader.uniforms.tClouds = { value: cloudsMap }
      shader.uniforms.tClouds.value.wrapS = THREE.RepeatWrapping
      shader.uniforms.uv_xOffset = { value: 0 }

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `
        #include <common>
        uniform sampler2D tClouds;
        uniform float uv_xOffset;
      `,
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <roughnessmap_fragment>",
        `
        float roughnessFactor = roughness;

        #ifdef USE_ROUGHNESSMAP
          vec4 texelRoughness = texture2D(roughnessMap, vRoughnessMapUv);
          // reversing the black and white values because we provide the ocean map
          texelRoughness = vec4(1.0) - texelRoughness;
          roughnessFactor *= clamp(texelRoughness.g, 0.5, 1.0);
        #endif
      `,
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <emissivemap_fragment>",
        `
        #ifdef USE_EMISSIVEMAP
          vec4 emissiveColor = texture2D(emissiveMap, vEmissiveMapUv);
          
          // Only show night lights on dark side
          emissiveColor *= 1.0 - smoothstep(-0.02, 0.0, dot(geometryNormal, directionalLights[0].direction));
          
          totalEmissiveRadiance *= emissiveColor.rgb;
        #endif

        // Cloud shadows
        float cloudsMapValue = texture2D(tClouds, vec2(vMapUv.x - uv_xOffset, vMapUv.y)).r;
        diffuseColor.rgb *= max(1.0 - cloudsMapValue, 0.2);

        // Atmospheric rim lighting
        float intensity = 1.4 - dot(geometryNormal, vec3(0.0, 0.0, 1.0));
        vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 5.0);
        diffuseColor.rgb += atmosphere;
      `,
      )

      // Save shader to update cloud offset in animation loop
      earthMat.userData.shader = shader
    }

    // Update function for animation
    const update = (delta: number) => {
      // Rotate Earth and clouds at different speeds
      const speedFactor = 2.0
      earth.rotation.y += delta * 0.005 * speedFactor
      clouds.rotation.y += delta * 0.01 * speedFactor

      // Update cloud shadows
      const shader = earthMat.userData.shader
      if (shader) {
        // Calculate cloud offset for shadows
        const offset = (delta * 0.005 * speedFactor) / (2 * Math.PI)
        shader.uniforms.uv_xOffset.value += offset % 1
      }
    }

    console.log("Realistic Earth created successfully with all textures loaded")
    return { group, earth, clouds, atmosphere, dirLight, update }
  } catch (error) {
    console.error("Error creating realistic Earth:", error)

    // Create a fallback Earth in case of texture loading errors
    const fallbackEarthGeo = new THREE.SphereGeometry(100, 64, 64)
    const fallbackEarthMat = new THREE.MeshBasicMaterial({
      color: 0x2233ff,
      wireframe: false,
    })

    const fallbackEarth = new THREE.Mesh(fallbackEarthGeo, fallbackEarthMat)
    group.add(fallbackEarth)

    // Simple update function for fallback
    const update = (delta: number) => {
      fallbackEarth.rotation.y += delta * 0.01
    }

    return {
      group,
      earth: fallbackEarth,
      clouds: new THREE.Mesh(), // Empty mesh
      atmosphere: new THREE.Mesh(), // Empty mesh
      dirLight,
      update,
    }
  }
}
