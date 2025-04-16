import type * as THREE from "three"

export interface NuclearData {
  country: string
  warheads: number
  lat: number
  lng: number
  color: string
}

export interface AbstractEarth {
  earth: THREE.Mesh
  wireframe: THREE.Mesh
  particles: THREE.Points
}

export interface RealisticEarth {
  group: THREE.Group
  earth: THREE.Mesh
  clouds: THREE.Mesh
  atmosphere: THREE.Mesh
  dirLight: THREE.DirectionalLight
  update: (delta: number) => void
}

export interface NuclearMarkers {
  markersGroup: THREE.Group
}
