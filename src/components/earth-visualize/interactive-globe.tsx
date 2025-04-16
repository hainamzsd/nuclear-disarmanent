"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { gsap } from "gsap"
import { CountUp } from "countup.js"

interface NuclearData {
  country: string
  warheads: number
  lat: number
  lng: number
  color: string
}

export function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [totalWarheads, setTotalWarheads] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeCountry, setActiveCountry] = useState<string | null>(null)
  const [isRealisticView, setIsRealisticView] = useState(false)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const globeRef = useRef<THREE.Mesh | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const markersRef = useRef<THREE.Group | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const realisticEarthGroupRef = useRef<THREE.Group | null>(null)
  const earthRef = useRef<THREE.Mesh | null>(null)
  const cloudsRef = useRef<THREE.Mesh | null>(null)
  const atmosphereRef = useRef<THREE.Mesh | null>(null)
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null)
  const wireframeRef = useRef<THREE.Mesh | null>(null)

  // Nuclear warhead data with coordinates
  const nuclearData: NuclearData[] = [
    { country: "United States", warheads: 5428, lat: 37.0902, lng: -95.7129, color: "#3b82f6" },
    { country: "Russia", warheads: 5977, lat: 61.524, lng: 105.3188, color: "#ef4444" },
    { country: "China", warheads: 350, lat: 35.8617, lng: 104.1954, color: "#f59e0b" },
    { country: "France", warheads: 290, lat: 46.2276, lng: 2.2137, color: "#0ea5e9" },
    { country: "United Kingdom", warheads: 225, lat: 55.3781, lng: -3.436, color: "#10b981" },
    { country: "Pakistan", warheads: 165, lat: 30.3753, lng: 69.3451, color: "#8b5cf6" },
    { country: "India", warheads: 160, lat: 20.5937, lng: 78.9629, color: "#f43f5e" },
    { country: "Israel", warheads: 90, lat: 31.0461, lng: 34.8516, color: "#14b8a6" },
    { country: "North Korea", warheads: 30, lat: 40.3399, lng: 127.5101, color: "#ec4899" },
  ]

  const toggleView = () => {
    setIsRealisticView((prev) => {
      const nextView = !prev

      if (realisticEarthGroupRef.current) realisticEarthGroupRef.current.visible = nextView

      if (globeRef.current) globeRef.current.visible = !nextView
      if (particlesRef.current) particlesRef.current.visible = !nextView
      if (markersRef.current) markersRef.current.visible = !nextView

      // explicitly handle wireframe visibility here
      if (wireframeRef.current) wireframeRef.current.visible = !nextView

      return nextView
    })
  }

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    // Calculate total warheads
    const total = nuclearData.reduce((sum, country) => sum + country.warheads, 0)
    setTotalWarheads(total)

    // Setup Three.js
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000) // Set black background
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 200
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = false
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.enablePan = false
    controls.minDistance = 150
    controls.maxDistance = 300
    controlsRef.current = controls
    controls.enableZoom = false

    // Earth globe (abstract visualization)
    const earthGeometry = new THREE.SphereGeometry(100, 64, 64)
    const earthMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.8,
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)
    globeRef.current = earth

    // Earth wireframe
    const wireframeGeometry = new THREE.SphereGeometry(101, 32, 32)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    scene.add(wireframe)
    wireframeRef.current = wireframe

    // Set initial visibility
    wireframe.visible = !isRealisticView

    // Particles for atmosphere effect
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 5000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      // Create a sphere of particles
      const radius = 120 + Math.random() * 30
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArray[i * 3 + 2] = radius * Math.cos(phi)
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)
    particlesRef.current = particles

    // Add nuclear markers
    const markersGroup = new THREE.Group()
    scene.add(markersGroup)
    markersRef.current = markersGroup

    // Create markers for each country with nuclear weapons
    nuclearData.forEach((country) => {
      // Convert lat/lng to 3D coordinates
      const phi = (90 - country.lat) * (Math.PI / 180)
      const theta = (country.lng + 180) * (Math.PI / 180)

      const x = -(105 * Math.sin(phi) * Math.cos(theta))
      const y = 105 * Math.cos(phi)
      const z = 105 * Math.sin(phi) * Math.sin(theta)

      // Create marker
      const markerGeometry = new THREE.SphereGeometry(2, 16, 16)
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(country.color),
        transparent: true,
        opacity: 0.8,
      })

      const marker = new THREE.Mesh(markerGeometry, markerMaterial)
      marker.position.set(x, y, z)
      marker.userData = { country: country.country, warheads: country.warheads }

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(3, 16, 16)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(country.color),
        transparent: true,
        opacity: 0.5,
      })

      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      marker.add(glow)

      // Pulse animation
      gsap.to(glow.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 1 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })

      markersGroup.add(marker)
    })

    // Add continents outline
    const loader = new THREE.TextureLoader()
    loader.load("/earth-outline.png", (texture) => {
      const continentsMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.6,
      })

      const continentsMesh = new THREE.Mesh(earthGeometry, continentsMaterial)
      continentsMesh.scale.set(1.01, 1.01, 1.01)
      scene.add(continentsMesh)

      setIsLoaded(true)
    })

    // Create realistic Earth visualization (initially hidden)
    const createRealisticEarth = async () => {
      // Create a group for the realistic Earth
      const realisticEarthGroup = new THREE.Group()
      realisticEarthGroup.visible = isRealisticView
      scene.add(realisticEarthGroup)
      realisticEarthGroupRef.current = realisticEarthGroup

      // Add ambient light for better overall illumination
      const ambientLight = new THREE.AmbientLight(0x404040, 1.5)
      realisticEarthGroup.add(ambientLight)

      // Add sun light
      scene.add(new THREE.AmbientLight(0xffffff, 1.2))
      const sunLight = new THREE.DirectionalLight(0xffffff, 2.5)
      sunLight.position.set(-50, 50, 50)
      scene.add(sunLight)

      // Load textures
      const textureLoader = new THREE.TextureLoader()

      const loadTexture = (url: string): Promise<THREE.Texture> => {
        return new Promise((resolve, reject) => {
          textureLoader.load(
            url,
            (texture) => {
              resolve(texture)
            },
            undefined,
            (error) => {
              console.error(`Error loading texture ${url}:`, error)
              reject(error)
            },
          )
        })
      }

      try {
        // Load all textures in parallel
        const [albedoMap, bumpMap, cloudsMap, oceanMap, lightsMap] = await Promise.all([
          loadTexture("/Albedo.jpg"),
          loadTexture("/Bump.jpg"),
          loadTexture("/Clouds.png"),
          loadTexture("/Ocean.png"),
          loadTexture("/night_lights_modified.png"),
        ])

        // Set proper color space
        albedoMap.colorSpace = THREE.SRGBColorSpace

        // Create Earth group with proper axial tilt
        const earthGroup = new THREE.Group()
        earthGroup.rotation.z = (23.5 / 360) * 2 * Math.PI
        realisticEarthGroup.add(earthGroup)

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

        const realisticEarth = new THREE.Mesh(earthGeo, earthMat)
        earthGroup.add(realisticEarth)
        earthRef.current = realisticEarth

        // Create clouds
        const cloudGeo = new THREE.SphereGeometry(102, 64, 64)
        const cloudsMat = new THREE.MeshStandardMaterial({
          alphaMap: cloudsMap,
          transparent: true,
          opacity: 0.4,
        })

        const clouds = new THREE.Mesh(cloudGeo, cloudsMat)
        earthGroup.add(clouds)
        cloudsRef.current = clouds

        // Set initial rotation
        realisticEarth.rotation.y = -0.3
        clouds.rotation.y = -0.3

        // Create atmosphere with a simple glow effect (matching the reference image)
        const atmosGeo = new THREE.SphereGeometry(110, 64, 64)
        const atmosMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x5566ff), // Slightly purple-blue color
          transparent: true,
          opacity: 0,
          side: THREE.BackSide,
        })

        const atmosphere = new THREE.Mesh(atmosGeo, atmosMat)
        earthGroup.add(atmosphere)
        atmosphereRef.current = atmosphere

        // Add a second, outer atmosphere layer for a more diffuse glow
        const outerAtmosGeo = new THREE.SphereGeometry(115, 64, 64)
        const outerAtmosMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x8080ff), // More purple tint
          transparent: true,
          opacity: 0,
          side: THREE.BackSide,
        })

        const outerAtmosphere = new THREE.Mesh(outerAtmosGeo, outerAtmosMat)
        earthGroup.add(outerAtmosphere)
      } catch (error) {
        console.error("Error creating realistic Earth:", error)

        // Create a fallback Earth if textures fail to load
        const fallbackEarthGeo = new THREE.SphereGeometry(100, 64, 64)
        const fallbackEarthMat = new THREE.MeshBasicMaterial({
          color: 0x2244aa,
        })

        const fallbackEarth = new THREE.Mesh(fallbackEarthGeo, fallbackEarthMat)
        realisticEarthGroup.add(fallbackEarth)
        earthRef.current = fallbackEarth
      }
    }

    createRealisticEarth()

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      // Update the raycaster
      raycaster.setFromCamera(mouse, camera)

      // Check for intersections with markers
      const intersects = raycaster.intersectObjects(markersGroup.children, true)

      if (intersects.length > 0) {
        const marker = intersects[0].object
        let targetMarker = marker

        // If we hit the glow, get the parent (actual marker)
        if (!marker.userData.country && marker.parent) {
          targetMarker = marker.parent
        }

        if (targetMarker.userData.country) {
          document.body.style.cursor = "pointer"
          setActiveCountry(targetMarker.userData.country)
        }
      } else {
        document.body.style.cursor = "default"
        setActiveCountry(null)
      }
    }

    const onClick = () => {
      if (activeCountry && !isRealisticView) {
        // Find the country data
        const country = nuclearData.find((c) => c.country === activeCountry)
        if (country) {
          // Animate camera to country position
          const phi = (90 - country.lat) * (Math.PI / 180)
          const theta = (country.lng + 180) * (Math.PI / 180)

          const x = -(200 * Math.sin(phi) * Math.cos(theta))
          const y = 200 * Math.cos(phi)
          const z = 200 * Math.sin(phi) * Math.sin(theta)

          gsap.to(camera.position, {
            x,
            y,
            z,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              camera.lookAt(0, 0, 0)
            },
          })
        }
      }
    }

    containerRef.current.addEventListener("mousemove", onMouseMove)
    containerRef.current.addEventListener("click", onClick)

    // Animation loop
    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)

      const delta = clock.getDelta()

      // Rotate the abstract earth slowly
      if (earth) {
        earth.rotation.y += 0.001
      }

      // Rotate particles slightly differently for effect
      if (particles) {
        particles.rotation.y += 0.0005
      }

      // Animate realistic Earth
      if (earthRef.current && cloudsRef.current) {
        // Rotate Earth and clouds at different speeds
        earthRef.current.rotation.y += delta * 0.005 * 2.0 // speedFactor = 2.0
        cloudsRef.current.rotation.y += delta * 0.01 * 2.0
      }

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Start counter animation when loaded
    if (isLoaded) {
      const countUpOptions = {
        duration: 2.5,
      }

      const countUpElement = document.getElementById("warhead-counter")
      if (countUpElement) {
        const countUp = new CountUp(countUpElement, total, countUpOptions)
        if (!countUp.error) {
          countUp.start()
        }
      }
    }

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeEventListener("mousemove", onMouseMove)
      containerRef.current?.removeEventListener("click", onClick)

      // Dispose of Three.js resources
      scene.clear()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-[600px] w-full">
      <canvas ref={canvasRef} className="h-full w-full" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">Global Nuclear Arsenal</h2>
        <div className="mt-2 text-4xl font-bold text-white drop-shadow-lg">
          <span id="warhead-counter">{totalWarheads}</span> Warheads
        </div>
      </div>

      {activeCountry && !isRealisticView && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-lg bg-black/70 p-4 text-center backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white">{activeCountry}</h3>
          <p className="text-lg text-white">
            {nuclearData.find((c) => c.country === activeCountry)?.warheads} Nuclear Warheads
          </p>
        </div>
      )}

      <div className="absolute bottom-4 right-4 text-sm text-white/70">
        {!isRealisticView && "Click on a marker to zoom to country"}
      </div>

      <button
        onClick={toggleView}
        className="absolute right-4 top-4 rounded-full bg-black/50 p-3 text-white transition-all hover:bg-black/70"
        aria-label={isRealisticView ? "Switch to abstract view" : "Switch to realistic view"}
      >
        {isRealisticView ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="21.17" y1="8" x2="12" y2="8"></line>
            <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
            <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
          </svg>
        )}
      </button>
    </div>
  )
}
