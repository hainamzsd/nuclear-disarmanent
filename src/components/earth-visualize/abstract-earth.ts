import * as THREE from "three"
import type { AbstractEarth } from "../types"

export function createAbstractEarth(scene: THREE.Scene): AbstractEarth {
  // Earth globe (abstract visualization)
  const earthGeometry = new THREE.SphereGeometry(100, 64, 64)
  const earthMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.8,
  })
  const earth = new THREE.Mesh(earthGeometry, earthMaterial)
  scene.add(earth)

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
  })

  return { earth, wireframe, particles }
}
