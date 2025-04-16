import * as THREE from "three"
import { gsap } from "gsap"
import type { NuclearData, NuclearMarkers } from "./types"

export function createNuclearMarkers(scene: THREE.Scene, nuclearData: NuclearData[]): NuclearMarkers {
  // Add nuclear markers
  const markersGroup = new THREE.Group()
  scene.add(markersGroup)

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
      opacity: 0.3,
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

  return { markersGroup }
}
