"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { gsap } from "gsap"
import { CountUp } from "countup.js"

// Import Earth components
import { createAbstractEarth } from "./abstract-earth"
import { createRealisticEarth } from "./realistic-earth"
import { createNuclearMarkers } from "./nuclear-markers"
import type { NuclearData } from "../types"

export function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [totalWarheads, setTotalWarheads] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeCountry, setActiveCountry] = useState<string | null>(null)
  const [isRealisticView, setIsRealisticView] = useState(false)

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)

  // Earth component references
  const abstractEarthRef = useRef<ReturnType<typeof createAbstractEarth> | null>(null)
  const realisticEarthRef = useRef<Awaited<ReturnType<typeof createRealisticEarth>> | null>(null)
  const markersRef = useRef<ReturnType<typeof createNuclearMarkers> | null>(null)

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

  // Fix the toggle function to handle the Promise correctly
  const toggleView = () => {
    if (isRealisticView) {
      // Switch to abstract view
      if (realisticEarthRef.current) {
        // Check if realisticEarthRef.current is not a Promise
        if ("group" in realisticEarthRef.current) {
          realisticEarthRef.current.group.visible = false
        }
      }
      if (abstractEarthRef.current) {
        abstractEarthRef.current.earth.visible = true
        abstractEarthRef.current.wireframe.visible = true
        abstractEarthRef.current.particles.visible = true
      }
      if (markersRef.current) markersRef.current.markersGroup.visible = true
      setIsRealisticView(false)
    } else {
      // Switch to realistic view
      if (realisticEarthRef.current) {
        // Check if realisticEarthRef.current is not a Promise
        if ("group" in realisticEarthRef.current) {
          realisticEarthRef.current.group.visible = true
        }
      }
      if (abstractEarthRef.current) {
        abstractEarthRef.current.earth.visible = false
        abstractEarthRef.current.wireframe.visible = false
        abstractEarthRef.current.particles.visible = false
      }
      if (markersRef.current) markersRef.current.markersGroup.visible = false
      setIsRealisticView(true)
    }
  }

  // Fix the initRealisticEarth function to properly handle the Promise
  const initRealisticEarth = async () => {
    try {
      console.log("Starting to create realistic Earth...")
      // Access the scene from the ref
      if (!sceneRef.current) {
        console.error("Scene is not initialized.")
        return
      }
      const realisticEarth = await createRealisticEarth(sceneRef.current)
      console.log("Realistic Earth created:", realisticEarth)
      realisticEarthRef.current = realisticEarth
      realisticEarth.group.visible = false
    } catch (error) {
      console.error("Failed to create realistic Earth:", error)
    }
  }

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    // Calculate total warheads
    const total = nuclearData.reduce((sum, country) => sum + country.warheads, 0)
    setTotalWarheads(total)

    // Setup Three.js
    const scene = new THREE.Scene()
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
      alpha: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputColorSpace = THREE.SRGBColorSpace
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
    controls.enableZoom = false

    // Create abstract Earth visualization
    const abstractEarth = createAbstractEarth(scene)
    abstractEarthRef.current = abstractEarth

    // Create nuclear markers
    const markers = createNuclearMarkers(scene, nuclearData)
    markersRef.current = markers

    // Load skybox texture
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load("/earth-skybox.jpg", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.background = texture
      setIsLoaded(true)
    })

    // Create realistic Earth visualization (initially hidden)

    initRealisticEarth()

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
      if (markers.markersGroup.visible) {
        const intersects = raycaster.intersectObjects(markers.markersGroup.children, true)

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

      // Update abstract Earth
      if (abstractEarth) {
        abstractEarth.earth.rotation.y += 0.001
        abstractEarth.particles.rotation.y += 0.0005
      }

      // Update realistic Earth
      if (realisticEarthRef.current) {
        // Check if realisticEarthRef.current is not a Promise
        if ("update" in realisticEarthRef.current) {
          realisticEarthRef.current.update(delta)
        }
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
  }, [nuclearData])

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
