import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TeaserCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- 1. CREATING THE SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#FFFFFF", 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

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
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // --- 2. PREMIUM LIGHTING SUITE ---
    // Soft Ambient Fill
    const ambientLight = new THREE.AmbientLight("#FFF7F3", 1.2);
    scene.add(ambientLight);

    // Main Studio Spotlight (Casts Shadows)
    const studioSpot = new THREE.SpotLight("#FFFFFF", 12);
    studioSpot.position.set(5, 8, 4);
    studioSpot.angle = Math.PI / 4;
    studioSpot.penumbra = 0.8;
    studioSpot.castShadow = true;
    studioSpot.shadow.bias = -0.001;
    studioSpot.shadow.mapSize.width = 2048;
    studioSpot.shadow.mapSize.height = 2048;
    scene.add(studioSpot);

    // Blazing Orange Backlight for Volumetric Glow effect
    const orangeRimLight = new THREE.DirectionalLight("#FF5722", 6);
    orangeRimLight.position.set(-6, -4, -2);
    scene.add(orangeRimLight);

    // Floating Highlight Pointlight to trace glass edges
    const highlightPoint = new THREE.PointLight("#FF8A65", 3, 10);
    highlightPoint.position.set(-2, 2, 2);
    scene.add(highlightPoint);

    // --- 3. MATERIALS SUITE ---
    // Hyper-Luxurious Orange Glass Material
    const orangeGlassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FF5722"),
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.95, // Transparent glass
      thickness: 1.8,     // Refraction thickness
      ior: 1.55,          // Index of Refraction
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });

    // Clear Crystal glass material for contrast
    const clearGlassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FFF3EE"),
      roughness: 0.05,
      metalness: 0.05,
      transmission: 0.98,
      thickness: 1.2,
      ior: 1.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.85,
    });

    // Platinum Anthracite Metal Material
    const platinumMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1A1A1A"),
      roughness: 0.15,
      metalness: 0.95,
    });

    // Orange Chrome Material
    const orangeChromeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FF5722"),
      roughness: 0.08,
      metalness: 0.9,
    });

    // --- 4. GEOMETRIES & SCULPTURES CONSTRUCT ---
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Outer Glass Orbit Ring 1 (Vertical rotation tilt)
    const ring1Geo = new THREE.TorusGeometry(1.8, 0.08, 32, 120);
    const ring1 = new THREE.Mesh(ring1Geo, orangeGlassMat);
    ring1.rotation.set(Math.PI / 3, Math.PI / 6, 0);
    sculptureGroup.add(ring1);

    // Inner Glass Orbit Ring 2 (Horizontal tilt)
    const ring2Geo = new THREE.TorusGeometry(1.3, 0.04, 32, 100);
    const ring2 = new THREE.Mesh(ring2Geo, clearGlassMat);
    ring2.rotation.set(-Math.PI / 4, Math.PI / 3, Math.PI / 12);
    sculptureGroup.add(ring2);

    // Small Accent Floating Glass Ring
    const ring3Geo = new THREE.TorusGeometry(2.3, 0.02, 16, 64);
    const ring3 = new THREE.Mesh(ring3Geo, orangeGlassMat);
    ring3.rotation.set(Math.PI / 2, -Math.PI / 4, 0);
    sculptureGroup.add(ring3);

    // Floating crystal geometry facets
    const crystalGeo = new THREE.IcosahedronGeometry(0.28, 0);
    const crystal1 = new THREE.Mesh(crystalGeo, clearGlassMat);
    crystal1.position.set(-1.8, 1.2, -0.5);
    sculptureGroup.add(crystal1);

    const crystal2 = new THREE.Mesh(crystalGeo, orangeGlassMat);
    crystal2.position.set(1.9, -1.0, 0.8);
    sculptureGroup.add(crystal2);

    // --- 5. ABSTRACT HV MONOGRAM ART ---
    const monogramGroup = new THREE.Group();
    sculptureGroup.add(monogramGroup);

    // Elegant Abstract "H"
    const hGroup = new THREE.Group();
    hGroup.position.set(-0.45, 0, 0);

    const leftBarGeo = new THREE.BoxGeometry(0.1, 1.0, 0.1);
    const leftBar = new THREE.Mesh(leftBarGeo, platinumMat);
    leftBar.position.set(-0.25, 0, 0);
    hGroup.add(leftBar);

    const rightBar = new THREE.Mesh(leftBarGeo, platinumMat);
    rightBar.position.set(0.25, 0, 0);
    hGroup.add(rightBar);

    const crossBarGeo = new THREE.BoxGeometry(0.5, 0.09, 0.1);
    const crossBar = new THREE.Mesh(crossBarGeo, platinumMat);
    crossBar.position.set(0, 0, 0);
    hGroup.add(crossBar);

    monogramGroup.add(hGroup);

    // Elegant Abstract "V"
    const vGroup = new THREE.Group();
    vGroup.position.set(0.45, 0, 0);

    const vBarGeo = new THREE.BoxGeometry(0.1, 1.05, 0.1);

    const vLeft = new THREE.Mesh(vBarGeo, orangeChromeMat);
    vLeft.position.set(-0.2, 0, 0);
    vLeft.rotation.z = -0.26; // subtle angle
    vGroup.add(vLeft);

    const vRight = new THREE.Mesh(vBarGeo, orangeChromeMat);
    vRight.position.set(0.2, 0, 0);
    vRight.rotation.z = 0.26;
    vGroup.add(vRight);

    monogramGroup.add(vGroup);

    // Scale and adjust the monogram within the sculpture group
    monogramGroup.scale.set(0.9, 0.9, 0.9);

    // --- 6. FLOATING PARTICLES FIELDS ---
    // Warm orange micro-stellar dust texture generator
    const createParticleTexture = (colorStr: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, colorStr);
        grad.addColorStop(0.25, colorStr.replace("1)", "0.3)"));
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    // Orange Particles
    const orangeParticlesCount = 90;
    const orangeParticlesGeo = new THREE.BufferGeometry();
    const orangePositions = new Float32Array(orangeParticlesCount * 3);

    for (let i = 0; i < orangeParticlesCount * 3; i += 3) {
      orangePositions[i] = (Math.random() - 0.5) * 12; // x
      orangePositions[i + 1] = (Math.random() - 0.5) * 8; // y
      orangePositions[i + 2] = (Math.random() - 0.5) * 6; // z
    }

    orangeParticlesGeo.setAttribute("position", new THREE.BufferAttribute(orangePositions, 3));
    const orangeParticlesMat = new THREE.PointsMaterial({
      size: 0.15,
      map: createParticleTexture("rgba(255, 87, 34, 1)"),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const orangeParticleSystem = new THREE.Points(orangeParticlesGeo, orangeParticlesMat);
    scene.add(orangeParticleSystem);

    // Translucent White Particles
    const whiteParticlesCount = 60;
    const whiteParticlesGeo = new THREE.BufferGeometry();
    const whitePositions = new Float32Array(whiteParticlesCount * 3);

    for (let i = 0; i < whiteParticlesCount * 3; i += 3) {
      whitePositions[i] = (Math.random() - 0.5) * 14;
      whitePositions[i + 1] = (Math.random() - 0.5) * 10;
      whitePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    whiteParticlesGeo.setAttribute("position", new THREE.BufferAttribute(whitePositions, 3));
    const whiteParticlesMat = new THREE.PointsMaterial({
      size: 0.12,
      map: createParticleTexture("rgba(220, 220, 220, 1)"),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const whiteParticleSystem = new THREE.Points(whiteParticlesGeo, whiteParticlesMat);
    scene.add(whiteParticleSystem);

    // --- 7. MOUSE & SENSORY INTERACTION INTERPOLATION ---
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- 8. THE CINEMATIC ANIMATION LOOP ---
    const clock = new THREE.Clock();

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Smoothly interpolate mouse coords for premium organic easing (damping)
      mouse.x += (targetMouse.x - mouse.x) * 0.06;
      mouse.y += (targetMouse.y - mouse.y) * 0.06;

      // 1. Hover parallax camera response
      camera.position.x = mouse.x * 0.9;
      camera.position.y = mouse.y * 0.7;
      camera.lookAt(0, 0, 0);

      // 2. Slow, floating, high-end rhythmic motion for sculptures
      sculptureGroup.position.y = Math.sin(elapsed * 0.4) * 0.15;
      sculptureGroup.position.x = Math.cos(elapsed * 0.25) * 0.08;

      // Uncoupled rotative drifts
      ring1.rotation.y = elapsed * 0.035;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.15) * 0.1;

      ring2.rotation.y = -elapsed * 0.045;
      ring2.rotation.x = -Math.PI / 4 + Math.cos(elapsed * 0.2) * 0.08;

      ring3.rotation.z = elapsed * 0.02;

      // Monogram very subtle, hypnotic rotation and sway
      monogramGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.12 + mouse.x * 0.25;
      monogramGroup.rotation.x = Math.cos(elapsed * 0.4) * 0.05 + mouse.y * 0.12;
      monogramGroup.position.z = Math.sin(elapsed * 0.5) * 0.05;

      // Floating crystal independent micro-orbits
      crystal1.position.y = 1.2 + Math.sin(elapsed * 0.8) * 0.15;
      crystal1.rotation.y += 0.003;
      crystal1.rotation.x += 0.002;

      crystal2.position.y = -1.0 + Math.cos(elapsed * 0.6) * 0.15;
      crystal2.rotation.y -= 0.002;
      crystal2.rotation.z += 0.003;

      // 3. Move point highlight light in a premium arc
      highlightPoint.position.x = Math.sin(elapsed * 0.5) * 3;
      highlightPoint.position.y = Math.cos(elapsed * 0.8) * 2 + 1;

      // 4. Particle fields drifting drift
      orangeParticleSystem.rotation.y = elapsed * 0.004;
      orangeParticleSystem.rotation.x = Math.sin(elapsed * 0.05) * 0.05;

      whiteParticleSystem.rotation.y = -elapsed * 0.003;
      whiteParticleSystem.rotation.z = Math.cos(elapsed * 0.04) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // --- 9. RESIZE OBSERVATION ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
      }
    });

    resizeObserver.observe(container);

    // --- 10. CLEANUP ON COMPONENT UNMOUNT ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Dispose webgl resources to prevent memory leaks
      scene.clear();
      orangeGlassMat.dispose();
      clearGlassMat.dispose();
      platinumMat.dispose();
      orangeChromeMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      crystalGeo.dispose();
      leftBarGeo.dispose();
      crossBarGeo.dispose();
      vBarGeo.dispose();
      orangeParticlesGeo.dispose();
      orangeParticlesMat.dispose();
      whiteParticlesGeo.dispose();
      whiteParticlesMat.dispose();
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
