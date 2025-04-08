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
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const globeRef = useRef<THREE.Mesh | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const markersRef = useRef<THREE.Group | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)

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

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    // Calculate total warheads
    const total = nuclearData.reduce((sum, country) => sum + country.warheads, 0)
    setTotalWarheads(total)

    // Setup Three.js
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000)
    camera.position.z = 200
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.enablePan = false
    controls.minDistance = 150
    controls.maxDistance = 300
    controlsRef.current = controls

    // Earth globe
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

    // Add continents outline
    const loader = new THREE.TextureLoader()
    loader.load('/earth-outline.png', (texture:any) => {
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
      if (activeCountry) {
        // Find the country data
        const country = nuclearData.find(c => c.country === activeCountry)
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
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Rotate the earth slowly
      if (earth && !controls.enabled) {
        earth.rotation.y += 0.001
      }
      
      // Rotate particles slightly differently for effect
      if (particles) {
        particles.rotation.y += 0.0005
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
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
          Global Nuclear Arsenal
        </h2>
        <div className="mt-2 text-4xl font-bold text-white drop-shadow-lg">
          <span id="warhead-counter">{totalWarheads}</span> Warheads
        </div>
      </div>
      
      {activeCountry && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-lg bg-black/70 p-4 text-center backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white">{activeCountry}</h3>
          <p className="text-lg text-white">
            {nuclearData.find(c => c.country === activeCountry)?.warheads} Nuclear Warheads
          </p>
        </div>
      )}
      
      <div className="absolute bottom-4 right-4 text-sm text-white/70">
        Click on a marker to zoom to country
      </div>
    </div>
  )
}
