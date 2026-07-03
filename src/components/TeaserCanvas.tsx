import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

interface TeaserCanvasProps {
  selectedCity: string;
  rotationSpeed: number;
  localHour: number;
}

// Convert Lat/Lon to 3D Cartesian coordinates on sphere
function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
}

interface LightParams {
  ambientColor: THREE.Color;
  ambientIntensity: number;
  keySpotColor: THREE.Color;
  keySpotIntensity: number;
  rimColor: THREE.Color;
  rimIntensity: number;
  atmosphereColor: THREE.Color;
  emissiveColor: THREE.Color;
  emissiveIntensity: number;
  fogColor: THREE.Color;
}

function getInterpolatedParams(hour: number): LightParams {
  const keyframes = [
    {
      hour: 0,
      ambientColor: new THREE.Color("#0c0c16"),
      ambientIntensity: 0.25,
      keySpotColor: new THREE.Color("#1f2438"),
      keySpotIntensity: 1.0,
      rimColor: new THREE.Color("#FF5722"),
      rimIntensity: 5.5,
      atmosphereColor: new THREE.Color("#801a00"),
      emissiveColor: new THREE.Color("#FF5722"),
      emissiveIntensity: 0.45,
      fogColor: new THREE.Color("#050508")
    },
    {
      hour: 6,
      ambientColor: new THREE.Color("#ffe5d4"),
      ambientIntensity: 1.1,
      keySpotColor: new THREE.Color("#ffa502"),
      keySpotIntensity: 11.0,
      rimColor: new THREE.Color("#ff4757"),
      rimIntensity: 13.0,
      atmosphereColor: new THREE.Color("#FF5722"),
      emissiveColor: new THREE.Color("#ffa502"),
      emissiveIntensity: 0.3,
      fogColor: new THREE.Color("#fff5f0")
    },
    {
      hour: 12,
      ambientColor: new THREE.Color("#ffffff"),
      ambientIntensity: 1.6,
      keySpotColor: new THREE.Color("#ffffff"),
      keySpotIntensity: 16.0,
      rimColor: new THREE.Color("#FF5722"),
      rimIntensity: 10.0,
      atmosphereColor: new THREE.Color("#ff9f1a"),
      emissiveColor: new THREE.Color("#fffaf0"),
      emissiveIntensity: 0.2,
      fogColor: new THREE.Color("#ffffff")
    },
    {
      hour: 18,
      ambientColor: new THREE.Color("#ffd2b3"),
      ambientIntensity: 1.0,
      keySpotColor: new THREE.Color("#ff4757"),
      keySpotIntensity: 13.0,
      rimColor: new THREE.Color("#FF5722"),
      rimIntensity: 15.0,
      atmosphereColor: new THREE.Color("#E63900"),
      emissiveColor: new THREE.Color("#FF5722"),
      emissiveIntensity: 0.38,
      fogColor: new THREE.Color("#ffebe0")
    },
    {
      hour: 24,
      ambientColor: new THREE.Color("#0c0c16"),
      ambientIntensity: 0.25,
      keySpotColor: new THREE.Color("#1f2438"),
      keySpotIntensity: 1.0,
      rimColor: new THREE.Color("#FF5722"),
      rimIntensity: 5.5,
      atmosphereColor: new THREE.Color("#801a00"),
      emissiveColor: new THREE.Color("#FF5722"),
      emissiveIntensity: 0.45,
      fogColor: new THREE.Color("#050508")
    }
  ];

  let prev = keyframes[0];
  let next = keyframes[1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    if (hour >= keyframes[i].hour && hour <= keyframes[i+1].hour) {
      prev = keyframes[i];
      next = keyframes[i+1];
      break;
    }
  }

  const range = next.hour - prev.hour;
  const t = range === 0 ? 0 : (hour - prev.hour) / range;
  const lerp = (a: number, b: number, alpha: number) => a + (b - a) * alpha;

  return {
    ambientColor: prev.ambientColor.clone().lerp(next.ambientColor, t),
    ambientIntensity: lerp(prev.ambientIntensity, next.ambientIntensity, t),
    keySpotColor: prev.keySpotColor.clone().lerp(next.keySpotColor, t),
    keySpotIntensity: lerp(prev.keySpotIntensity, next.keySpotIntensity, t),
    rimColor: prev.rimColor.clone().lerp(next.rimColor, t),
    rimIntensity: lerp(prev.rimIntensity, next.rimIntensity, t),
    atmosphereColor: prev.atmosphereColor.clone().lerp(next.atmosphereColor, t),
    emissiveColor: prev.emissiveColor.clone().lerp(next.emissiveColor, t),
    emissiveIntensity: lerp(prev.emissiveIntensity, next.emissiveIntensity, t),
    fogColor: prev.fogColor.clone().lerp(next.fogColor, t)
  };
}

export default function TeaserCanvas({ selectedCity = "auto", rotationSpeed = 1, localHour = 12 }: TeaserCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const configRef = useRef({ selectedCity, rotationSpeed, localHour });

  // Keep props updated inside ref so animation loop has instant frictionless access without re-instantiating WebGL
  useEffect(() => {
    configRef.current = { selectedCity, rotationSpeed, localHour };
  }, [selectedCity, rotationSpeed, localHour]);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- 1. SCENE & CAMERA SETUP (LUXURY ENVIRONMENT) ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#FFFFFF", 0.08);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- EFFECT COMPOSER WITH BLOOM PASS FOR INTENSE GLOW ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.6,   // Bloom strength
      0.65,  // Bloom radius
      0.18   // Bloom threshold (lowered so orange elements glow elegantly)
    );
    composer.addPass(bloomPass);

    // --- 2. LUXURY LIGHTING SETUP ---
    const ambientLight = new THREE.AmbientLight("#FFFBF9", 1.6);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight("#FFFFFF", 16);
    keySpot.position.set(8, 10, 6);
    keySpot.angle = Math.PI / 4;
    keySpot.penumbra = 0.9;
    keySpot.castShadow = true;
    scene.add(keySpot);

    const orangeRimLight = new THREE.DirectionalLight("#FF5722", 12);
    orangeRimLight.position.set(-8, -4, -4);
    scene.add(orangeRimLight);

    const softFillLight = new THREE.DirectionalLight("#FFF4EF", 3);
    softFillLight.position.set(-2, 6, 2);
    scene.add(softFillLight);

    const solarPointLight = new THREE.PointLight("#FF5722", 6, 12);
    solarPointLight.position.set(4, 2, 3);
    scene.add(solarPointLight);

    // --- 3. PROCEDURAL TEXTURE GENERATION ---
    const generateEarthTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.fillRect(0, 0, 1024, 512);

        // Geographically calculated continent polygons (simplified for premium vectors)
        const continents = [
          // North America & Greenland
          [
            [-168, 65], [-120, 70], [-100, 70], [-80, 80], [-60, 80], [-55, 50], 
            [-80, 25], [-99, 15], [-105, 19], [-110, 8], [-95, 15], [-80, 24], 
            [-74, 40], [-64, 45], [-52, 47], [-64, 60], [-80, 55], [-100, 60]
          ],
          [
            [-70, 70], [-60, 83], [-10, 80], [-40, 60], [-70, 70]
          ],
          // South America
          [
            [-80, 12], [-72, 10], [-50, -5], [-35, -6], [-40, -20], [-60, -40], 
            [-70, -55], [-75, -53], [-72, -40], [-80, -15], [-81, -5]
          ],
          // Africa
          [
            [-17, 32], [10, 32], [32, 31], [34, 27], [51, 11], [46, -10], 
            [34, -34], [18, -34], [10, 5], [-8, 4], [-17, 15]
          ],
          // Eurasia
          [
            [-10, 60], [10, 65], [30, 70], [60, 75], [90, 75], [120, 75], 
            [160, 70], [170, 60], [140, 35], [120, 15], [108, 1], [100, 10], 
            [80, 5], [75, 15], [60, 10], [50, 25], [35, 30], [25, 35], 
            [15, 30], [12, 40], [-5, 36], [-9, 43], [-5, 50], [-10, 60]
          ],
          // India & Southeast Asia
          [
            [68, 24], [78, 8], [88, 22], [73, 23], [68, 24]
          ],
          [
            [95, 20], [108, 10], [105, 1], [100, 15], [95, 20]
          ],
          // Australia
          [
            [113, -22], [115, -34], [135, -38], [150, -34], [151, -11], 
            [142, -11], [136, -25], [113, -22]
          ]
        ];

        // Draw continents in pure bold blaze orange
        ctx.fillStyle = "rgba(255, 87, 34, 0.95)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.lineWidth = 1.5;

        continents.forEach(poly => {
          ctx.beginPath();
          poly.forEach(([lon, lat], index) => {
            const x = ((lon + 180) / 360) * 1024;
            const y = ((90 - lat) / 180) * 512;
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        });

        // Delicate tech coordinate lines
        ctx.strokeStyle = "rgba(255, 87, 34, 0.2)";
        ctx.lineWidth = 0.5;
        for (let lat = -80; lat <= 80; lat += 20) {
          const y = ((90 - lat) / 180) * 512;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(1024, y);
          ctx.stroke();
        }
        for (let lon = -180; lon <= 180; lon += 30) {
          const x = ((lon + 180) / 360) * 1024;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 512);
          ctx.stroke();
        }
      }

      return new THREE.CanvasTexture(canvas);
    };

    const earthTexture = generateEarthTexture();

    // --- 4. 3D EARTH OBJECT CREATION ---
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Layer 1: Inner Solid Core
    const coreGeo = new THREE.SphereGeometry(1.95, 64, 64);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FFFFFF"),
      emissive: new THREE.Color("#FFF5F0"),
      emissiveIntensity: 0.35,
      roughness: 0.08,
      metalness: 0.05,
      clearcoat: 1.0,
    });
    const innerCore = new THREE.Mesh(coreGeo, coreMat);
    earthGroup.add(innerCore);

    // Layer 2: Continental Glass Overlay
    const globeGeo = new THREE.SphereGeometry(2.0, 64, 64);
    const globeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FFFFFF"),
      roughness: 0.12,
      metalness: 0.1,
      map: earthTexture,
      alphaMap: earthTexture,
      transparent: true,
      opacity: 0.95,
      transmission: 0.45,
      ior: 1.52,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
    const globeContinentMesh = new THREE.Mesh(globeGeo, globeMat);
    earthGroup.add(globeContinentMesh);

    // Layer 3: Tech Grid Atmospheric Dome
    const gridAtmosphereGeo = new THREE.SphereGeometry(2.08, 24, 24);
    const gridAtmosphereMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF5722"),
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const gridAtmosphere = new THREE.Mesh(gridAtmosphereGeo, gridAtmosphereMat);
    earthGroup.add(gridAtmosphere);

    // --- 5. INTERACTIVE COORDS BEACON SYSTEM ---
    const beaconGroup = new THREE.Group();
    earthGroup.add(beaconGroup);

    // Beacon Core Dot
    const beaconDotGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const beaconDotMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF5722"),
    });
    const beaconDot = new THREE.Mesh(beaconDotGeo, beaconDotMat);
    beaconGroup.add(beaconDot);

    // Beacon Pulsing Wave Ring
    const beaconRingGeo = new THREE.RingGeometry(0.01, 0.18, 32);
    const beaconRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF5722"),
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const beaconRing = new THREE.Mesh(beaconRingGeo, beaconRingMat);
    beaconRing.rotation.x = Math.PI / 2; // Flat on surface
    beaconGroup.add(beaconRing);

    // Hide beacon initially
    beaconGroup.visible = false;

    // Cities Database (Lat, Lon, and Target camera rotations)
    const cities: Record<string, { lat: number; lon: number }> = {
      SF: { lat: 37.7749, lon: -122.4194 },
      LDN: { lat: 51.5074, lon: -0.1278 },
      BOM: { lat: 19.0760, lon: 72.8777 },
      SIN: { lat: 1.3521, lon: 103.8198 },
    };

    // --- 6. GLOBAL NETWORKS ORBITS ---
    // Primary Orbit Ring
    const orbitRing1Geo = new THREE.TorusGeometry(2.7, 0.02, 16, 120);
    const orbitRing1Mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FF5722"),
      roughness: 0.1,
      transmission: 0.9,
      transparent: true,
      opacity: 0.7,
    });
    const orbitRing1 = new THREE.Mesh(orbitRing1Geo, orbitRing1Mat);
    orbitRing1.rotation.set(Math.PI / 3, Math.PI / 6, 0);
    earthGroup.add(orbitRing1);

    // Secondary Orbit Ring
    const orbitRing2Geo = new THREE.TorusGeometry(3.1, 0.01, 16, 100);
    const orbitRing2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#202020"),
      transparent: true,
      opacity: 0.08,
    });
    const orbitRing2 = new THREE.Mesh(orbitRing2Geo, orbitRing2Mat);
    orbitRing2.rotation.set(-Math.PI / 4, Math.PI / 4, 0);
    earthGroup.add(orbitRing2);

    // Satellite Capital point
    const satGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const satMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FF5722"),
      roughness: 0.1,
      metalness: 0.95,
    });
    const satelliteNode = new THREE.Mesh(satGeo, satMat);
    earthGroup.add(satelliteNode);

    // --- 7. PARTICLES DUST FIELDS ---
    const createStarsTexture = (colorStr: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, colorStr);
        grad.addColorStop(0.3, colorStr.replace("1)", "0.2)"));
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particlesCount = 85;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.14,
      map: createStarsTexture("rgba(255, 87, 34, 1)"),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // --- 8. MOUSE & ROTATIVE LOGIC SENSING ---
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cache local auto-rotation variable so it transitions cleanly from its current spot
    let currentAutoY = 0;
    const targetRot = new THREE.Vector2(0, 0);

    const clock = new THREE.Clock();

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Damped mouse coords smoothing
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Subtle parallax camera drift
      camera.position.x = mouse.x * 1.0;
      camera.position.y = mouse.y * 0.8;
      camera.lookAt(0, 0, 0);

      const activeConfig = configRef.current;
      const speedMult = activeConfig.rotationSpeed;
      const activeCity = activeConfig.selectedCity;
      const localHourVal = activeConfig.localHour;

      // Apply dynamic day/night lighting interpolation
      const params = getInterpolatedParams(localHourVal);
      
      ambientLight.color.copy(params.ambientColor);
      ambientLight.intensity = params.ambientIntensity;

      keySpot.color.copy(params.keySpotColor);
      keySpot.intensity = params.keySpotIntensity;

      orangeRimLight.color.copy(params.rimColor);
      orangeRimLight.intensity = params.rimIntensity;

      coreMat.emissive.copy(params.emissiveColor);
      coreMat.emissiveIntensity = params.emissiveIntensity;

      gridAtmosphereMat.color.copy(params.atmosphereColor);

      if (scene.fog) {
        scene.fog.color.copy(params.fogColor);
      }

      if (activeCity === "auto") {
        // Continuous organic orbit rotation
        currentAutoY += 0.006 * speedMult;
        targetRot.set(0, currentAutoY);

        // Standard floating tilt
        earthGroup.rotation.y = targetRot.y;
        earthGroup.rotation.x = THREE.MathUtils.lerp(earthGroup.rotation.x, mouse.y * 0.2, 0.05);
        earthGroup.rotation.z = THREE.MathUtils.lerp(earthGroup.rotation.z, -mouse.x * 0.15, 0.05);

        // Hide beacon
        beaconGroup.visible = false;
      } else {
        // Lock on specifically selected geographic coordinates
        const cityData = cities[activeCity];
        if (cityData) {
          // Precise mathematical angle offsets to center the location perfectly facing camera
          const targetY = -(cityData.lon * Math.PI) / 180 + Math.PI / 2;
          const targetX = (cityData.lat * Math.PI) / 180 - Math.PI / 10;

          // Smooth lerp focus transition
          earthGroup.rotation.y = THREE.MathUtils.lerp(earthGroup.rotation.y, targetY, 0.06);
          earthGroup.rotation.x = THREE.MathUtils.lerp(earthGroup.rotation.x, targetX + mouse.y * 0.12, 0.06);
          earthGroup.rotation.z = THREE.MathUtils.lerp(earthGroup.rotation.z, -mouse.x * 0.1, 0.06);

          // Position Beacon
          const beaconPos = latLonToVector3(cityData.lat, cityData.lon, 2.02);
          beaconGroup.position.copy(beaconPos);
          
          // Rotate beacon so its flat ring matches the sphere's surface curvature
          const normalVec = beaconPos.clone().normalize();
          beaconGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normalVec);

          // Show beacon
          beaconGroup.visible = true;

          // Pulse radar wave ring
          const ringPulse = (elapsed * 3) % 2; // loops from 0 to 2
          beaconRing.scale.set(ringPulse + 0.1, ringPulse + 0.1, 1);
          beaconRingMat.opacity = Math.max(0, 1 - ringPulse / 2);

          // Seed the current auto position so when switching back to auto it doesn't snap suddenly
          currentAutoY = earthGroup.rotation.y;
        }
      }

      // Independent micro rotation variables
      gridAtmosphere.rotation.y = -elapsed * 0.02;

      // Orbit satellite node path
      const satAngle = elapsed * 0.4;
      satelliteNode.position.set(
        Math.cos(satAngle) * 2.7,
        Math.sin(satAngle) * 2.7 * Math.cos(Math.PI / 3),
        Math.sin(satAngle) * 2.7 * Math.sin(Math.PI / 3)
      );

      orbitRing1.rotation.z = elapsed * 0.03;
      orbitRing2.rotation.z = -elapsed * 0.015;

      // Solar bounce flare cycle
      solarPointLight.position.x = Math.sin(elapsed * 0.4) * 4;
      solarPointLight.position.y = Math.cos(elapsed * 0.6) * 3;

      particleSystem.rotation.y = elapsed * 0.003;

      composer.render();
    };

    animate();

    // --- 9. RESIZE HANDLING ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        renderer.setSize(newWidth, newHeight);
        composer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
      }
    });

    resizeObserver.observe(container);

    // --- 10. UNMOUNT CLEANUP ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose materials & geometries
      scene.clear();
      earthTexture.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      gridAtmosphereGeo.dispose();
      gridAtmosphereMat.dispose();
      beaconDotGeo.dispose();
      beaconDotMat.dispose();
      beaconRingGeo.dispose();
      beaconRingMat.dispose();
      orbitRing1Geo.dispose();
      orbitRing1Mat.dispose();
      orbitRing2Geo.dispose();
      orbitRing2Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
}
