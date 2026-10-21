import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

interface NodeData {
  id: string;
  name: string;
  category: string;
  status: string;
  position: [number, number, number];
  color: number;
  highlightColor: number;
  description: string;
}

const VENTURE_NODES: NodeData[] = [
  {
    id: "01",
    name: "Beautiful The Boutique",
    category: "Retail Designer Store",
    status: "Active Venture",
    position: [-2.2, 1.35, 0.5],
    color: 0x6F2DBD,
    highlightColor: 0x9D4EDD,
    description: "Curated designer collections & bespoke retail fashion",
  },
  {
    id: "02",
    name: "Cilaee Cadaee",
    category: "Bridal & Ethnic Couture",
    status: "Active Brand",
    position: [2.3, 1.2, -0.3],
    color: 0x7928CA,
    highlightColor: 0xC084FC,
    description: "Bespoke bridal wear & artisanal ethnic couture",
  },
  {
    id: "03",
    name: "Blaze Graphics",
    category: "Brand & Digital Studio",
    status: "Active Studio",
    position: [-1.9, -1.35, -0.4],
    color: 0x4B168C,
    highlightColor: 0x8B5CF6,
    description: "Visual identity design & high-impact digital marketing",
  },
  {
    id: "04",
    name: "QuoteFlow AI",
    category: "AI Quotation SaaS",
    status: "Launching 2027",
    position: [2.0, -1.3, 0.6],
    color: 0x9333EA,
    highlightColor: 0xE879F9,
    description: "Autonomous commercial quotation engine & pipeline workflows",
  },
];

export const HeroThreeNetwork: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeHoverNode, setActiveHoverNode] = useState<NodeData | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 540;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    // Root interactive group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // -------------------------------------------------------------
    // LIGHTING: Multidimensional royal purple & prismatic rim highlights
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xF3E8FF, 2.8);
    dirLight1.position.set(6, 8, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x6F2DBD, 2.2);
    dirLight2.position.set(-6, -5, 5);
    scene.add(dirLight2);

    const pointLightCenter = new THREE.PointLight(0xA855F7, 3, 6);
    pointLightCenter.position.set(0, 0, 0);
    networkGroup.add(pointLightCenter);

    // -------------------------------------------------------------
    // 1. DUAL-SHELL CRYSTALLINE CORE (Harpalani Ventures Parent Hub)
    // -------------------------------------------------------------
    // Inner Solid Faceted Jewel
    const innerCoreGeom = new THREE.IcosahedronGeometry(0.72, 1);
    const innerCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0x32106B,
      metalness: 0.45,
      roughness: 0.1,
      transmission: 0.55,
      ior: 1.6,
      thickness: 1.5,
      specularIntensity: 1.2,
      specularColor: 0xE9D8FD,
      flatShading: true,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeom, innerCoreMat);
    networkGroup.add(innerCoreMesh);

    // Outer Translucent Geometric Wire Cage
    const cageGeom = new THREE.IcosahedronGeometry(0.96, 2);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0xA855F7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.Mesh(cageGeom, cageMat);
    networkGroup.add(cageMesh);

    // -------------------------------------------------------------
    // 2. GYROSCOPIC CELESTIAL ORBITAL RINGS WITH EMBEDDED MICRO-NODES
    // -------------------------------------------------------------
    interface RingData {
      line: THREE.Line;
      particles: THREE.Points;
      rotSpeed: { x: number; y: number; z: number };
    }
    const orbitalRings: RingData[] = [];

    const ringConfigs = [
      { radius: 1.65, color: 0x6F2DBD, opacity: 0.4, particleCount: 24, rot: { x: 0.003, y: 0.006, z: 0.004 } },
      { radius: 2.35, color: 0x9333EA, opacity: 0.35, particleCount: 32, rot: { x: -0.004, y: 0.003, z: -0.005 } },
      { radius: 3.1, color: 0x32106B, opacity: 0.25, particleCount: 40, rot: { x: 0.005, y: -0.004, z: 0.003 } },
      { radius: 3.65, color: 0xC084FC, opacity: 0.2, particleCount: 48, rot: { x: -0.003, y: -0.005, z: 0.004 } },
    ];

    ringConfigs.forEach((cfg, idx) => {
      // Ring circle
      const segments = 160;
      const points: THREE.Vector3[] = [];
      const particlePositions = new Float32Array(cfg.particleCount * 3);

      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * cfg.radius, Math.sin(theta) * cfg.radius, 0));
      }

      for (let p = 0; p < cfg.particleCount; p++) {
        const theta = (p / cfg.particleCount) * Math.PI * 2;
        particlePositions[p * 3] = Math.cos(theta) * cfg.radius;
        particlePositions[p * 3 + 1] = Math.sin(theta) * cfg.radius;
        particlePositions[p * 3 + 2] = 0;
      }

      const ringGeom = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
      });
      const ringLine = new THREE.Line(ringGeom, ringMat);

      // Micro glowing satellites on the orbit ring
      const particleGeom = new THREE.BufferGeometry();
      particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: cfg.color,
        size: 0.045,
        transparent: true,
        opacity: 0.75,
      });
      const particles = new THREE.Points(particleGeom, particleMat);

      const ringGroup = new THREE.Group();
      ringGroup.add(ringLine);
      ringGroup.add(particles);

      ringGroup.rotation.x = Math.PI * (0.2 + idx * 0.22);
      ringGroup.rotation.y = Math.PI * (0.15 + idx * 0.18);
      networkGroup.add(ringGroup);

      orbitalRings.push({
        line: ringLine,
        particles,
        rotSpeed: cfg.rot,
      });
    });

    // -------------------------------------------------------------
    // 3. AMBIENT PARTICULATE STARFIELD (Constellation Depth)
    // -------------------------------------------------------------
    const starCount = 140;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const c1 = new THREE.Color(0x32106B);
    const c2 = new THREE.Color(0xC084FC);
    const c3 = new THREE.Color(0xEDE5F7);

    for (let i = 0; i < starCount; i++) {
      const r = 1.2 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const blendColor = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      starColors[i * 3] = blendColor.r;
      starColors[i * 3 + 1] = blendColor.g;
      starColors[i * 3 + 2] = blendColor.b;
    }

    const starGeom = new THREE.BufferGeometry();
    starGeom.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeom.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const starField = new THREE.Points(starGeom, starMat);
    networkGroup.add(starField);

    // -------------------------------------------------------------
    // 4. VENTURE NODES: Multi-layered Jewels with Pulsing Halos
    // -------------------------------------------------------------
    interface NodeMeshItem {
      data: NodeData;
      group: THREE.Group;
      core: THREE.Mesh;
      halo: THREE.Mesh;
      pulseRing: THREE.Mesh;
      beamLine: THREE.Line;
      beamPoints: THREE.Vector3[];
    }
    const nodeItems: NodeMeshItem[] = [];

    VENTURE_NODES.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(...node.position);

      // Node core faceted sphere
      const nodeGeom = new THREE.IcosahedronGeometry(0.3, 2);
      const nodeMat = new THREE.MeshPhysicalMaterial({
        color: node.color,
        roughness: 0.15,
        metalness: 0.3,
        transmission: 0.35,
        ior: 1.45,
        specularColor: 0xffffff,
        emissive: node.color,
        emissiveIntensity: 0.35,
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeGroup.add(nodeMesh);

      // Micro glowing beacon inside the node
      const beaconLight = new THREE.PointLight(node.highlightColor, 1.2, 2.5);
      nodeGroup.add(beaconLight);

      // First Halo (Concentric Rim)
      const haloGeom = new THREE.RingGeometry(0.36, 0.42, 48);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.highlightColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const haloMesh = new THREE.Mesh(haloGeom, haloMat);
      nodeGroup.add(haloMesh);

      // Second Pulsing Outer Radar Wave
      const pulseGeom = new THREE.RingGeometry(0.44, 0.48, 48);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xEDE5F7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
      });
      const pulseMesh = new THREE.Mesh(pulseGeom, pulseMat);
      nodeGroup.add(pulseMesh);

      networkGroup.add(nodeGroup);

      // Radiant energy beam connecting to the central Harpalani core
      const beamPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...node.position),
      ];
      const beamGeom = new THREE.BufferGeometry().setFromPoints(beamPoints);
      const beamMat = new THREE.LineBasicMaterial({
        color: node.highlightColor,
        transparent: true,
        opacity: 0.4,
      });
      const beamLine = new THREE.Line(beamGeom, beamMat);
      networkGroup.add(beamLine);

      nodeItems.push({
        data: node,
        group: nodeGroup,
        core: nodeMesh,
        halo: haloMesh,
        pulseRing: pulseMesh,
        beamLine,
        beamPoints,
      });
    });

    // -------------------------------------------------------------
    // 5. INTER-VENTURE ARCHITECTURAL ENERGY CURVES (Dynamic Lattice)
    // -------------------------------------------------------------
    const latticePairs = [
      [VENTURE_NODES[0].position, VENTURE_NODES[1].position],
      [VENTURE_NODES[1].position, VENTURE_NODES[3].position],
      [VENTURE_NODES[3].position, VENTURE_NODES[2].position],
      [VENTURE_NODES[2].position, VENTURE_NODES[0].position],
      [VENTURE_NODES[0].position, VENTURE_NODES[3].position], // Cross-lattice diagonal
    ];

    latticePairs.forEach(([p1, p2]) => {
      // Create curved quadratic bezier connection
      const mid = new THREE.Vector3(
        (p1[0] + p2[0]) * 0.5 * 1.15,
        (p1[1] + p2[1]) * 0.5 * 1.15,
        (p1[2] + p2[2]) * 0.5 + 0.35
      );
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...p1),
        mid,
        new THREE.Vector3(...p2)
      );
      const curvePoints = curve.getPoints(36);
      const curveGeom = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMat = new THREE.LineDashedMaterial({
        color: 0x6F2DBD,
        dashSize: 0.12,
        gapSize: 0.08,
        transparent: true,
        opacity: 0.28,
      });
      const curveLine = new THREE.Line(curveGeom, curveMat);
      curveLine.computeLineDistances();
      networkGroup.add(curveLine);
    });

    // -------------------------------------------------------------
    // RAYCASTING: Interactive Mouse Hover on Nodes
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.x = nx;
      mouse.y = ny;
      targetX = nx * 0.45;
      targetY = ny * 0.4;
    };

    container.addEventListener("mousemove", handlePointerMove);

    // -------------------------------------------------------------
    // RENDER & ANIMATION LOOP
    // -------------------------------------------------------------
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!shouldReduceMotion) {
        // Smooth mouse parallax damping
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;

        networkGroup.rotation.y = currentX + Math.sin(elapsed * 0.22) * 0.09;
        networkGroup.rotation.x = -currentY + Math.cos(elapsed * 0.18) * 0.07;

        // Core jewel rotations
        innerCoreMesh.rotation.x = elapsed * 0.18;
        innerCoreMesh.rotation.y = elapsed * 0.26;
        cageMesh.rotation.x = -elapsed * 0.12;
        cageMesh.rotation.y = -elapsed * 0.16;

        // Breathing pulse on the core
        const corePulse = 1 + Math.sin(elapsed * 1.5) * 0.035;
        innerCoreMesh.scale.set(corePulse, corePulse, corePulse);

        // Orbital rings dynamic gyroscopic spin
        orbitalRings.forEach((r, idx) => {
          r.line.parent?.rotateX(r.rotSpeed.x);
          r.line.parent?.rotateY(r.rotSpeed.y);
          r.line.parent?.rotateZ(r.rotSpeed.z);
        });

        // Background starfield subtle drift
        starField.rotation.y = elapsed * 0.02;

        // Node animations (gentle levitation + billboarded rings)
        nodeItems.forEach((item, idx) => {
          const hoverOffset = Math.sin(elapsed * 1.8 + idx * 1.2) * 0.06;
          item.group.position.y = item.data.position[1] + hoverOffset;

          // Pulse radar wave expanding
          const pulseScale = 1 + ((elapsed * 0.8 + idx * 0.25) % 1) * 0.45;
          const pulseOpacity = Math.max(0, 0.45 * (1 - ((elapsed * 0.8 + idx * 0.25) % 1)));
          item.pulseRing.scale.set(pulseScale, pulseScale, pulseScale);
          (item.pulseRing.material as THREE.MeshBasicMaterial).opacity = pulseOpacity;

          // Always face camera
          item.halo.lookAt(camera.position);
          item.pulseRing.lookAt(camera.position);

          // Update beam points to follow levitating node
          const updatedPoints = [
            new THREE.Vector3(0, 0, 0),
            item.group.position,
          ];
          item.beamLine.geometry.setFromPoints(updatedPoints);
        });
      }

      // Check hover intersection
      raycaster.setFromCamera(mouse, camera);
      const clickableMeshes = nodeItems.map((n) => n.core);
      const intersects = raycaster.intersectObjects(clickableMeshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const matched = nodeItems.find((n) => n.core === hitMesh);
        if (matched) {
          setActiveHoverNode(matched.data);
          matched.core.scale.set(1.28, 1.28, 1.28);
          (matched.halo.material as THREE.MeshBasicMaterial).opacity = 0.9;
          container.style.cursor = "pointer";
        }
      } else {
        nodeItems.forEach((n) => {
          n.core.scale.set(1, 1, 1);
          (n.halo.material as THREE.MeshBasicMaterial).opacity = 0.45;
        });
        setActiveHoverNode(null);
        container.style.cursor = "grab";
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [shouldReduceMotion]);

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto select-none group">
      {/* Dynamic Ambient Lavender/Purple Backdrop with Layered Depth */}
      <div 
        className="absolute inset-0 bg-radial from-[#EDE5F7]/85 via-[#F8F6FB]/50 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-105" 
        aria-hidden="true"
      />
      
      {/* Decorative Outer Thin Dial Ring */}
      <div 
        className="absolute inset-4 rounded-full border border-[#32106B]/[0.07] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute inset-12 rounded-full border border-[#6F2DBD]/[0.08] border-dashed pointer-events-none"
        aria-hidden="true"
      />

      {/* Three.js Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing" 
        aria-label="Interactive 3D Harpalani Ventures Connected Ecosystem Visualization"
      />

      {/* Floating Center Brand Badge Overlay */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center justify-center w-22 h-22 rounded-full bg-white/95 backdrop-blur-md border border-[#32106B]/18 shadow-[0_10px_32px_rgba(50,16,107,0.16)] transition-transform duration-500 group-hover:scale-105"
      >
        <span className="font-serif-luxury font-bold text-2xl text-[#32106B] tracking-wider leading-none">
          HV
        </span>
        <span className="text-[7.5px] font-sans-clean font-bold tracking-[0.28em] text-[#6F2DBD] uppercase mt-1">
          GROUP
        </span>
        <span className="w-1 h-1 rounded-full bg-[#6F2DBD] mt-1 animate-ping" />
      </div>

      {/* Interactive Tooltip Card that responds when hovering nodes */}
      {activeHoverNode && (
        <div 
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none bg-white/96 backdrop-blur-md border border-[#32106B]/20 rounded-xl px-4 py-2.5 shadow-[0_12px_28px_rgba(50,16,107,0.15)] text-center max-w-[280px] animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6F2DBD]" />
            <span className="text-[10px] font-sans-clean font-bold tracking-[0.2em] uppercase text-[#6F2DBD]">
              {activeHoverNode.category}
            </span>
          </div>
          <h4 className="font-serif-luxury text-sm font-medium text-[#17131D] leading-tight">
            {activeHoverNode.name}
          </h4>
          <p className="text-[11px] font-sans-clean text-[#17131D]/75 mt-0.5 line-clamp-1">
            {activeHoverNode.description}
          </p>
        </div>
      )}

      {/* Fixed Architectural Micro Badges around the perimeter */}
      <div className="absolute top-4 left-3 z-20 pointer-events-none transition-transform duration-300 hover:scale-105">
        <div className="bg-white/92 backdrop-blur-md border border-[#32106B]/12 rounded-full px-3 py-1 shadow-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6F2DBD] animate-pulse" />
          <span className="text-[10.5px] font-sans-clean font-semibold text-[#17131D] tracking-wide">
            Retail Designer Store
          </span>
        </div>
      </div>

      <div className="absolute top-6 right-3 z-20 pointer-events-none transition-transform duration-300 hover:scale-105">
        <div className="bg-white/92 backdrop-blur-md border border-[#32106B]/12 rounded-full px-3 py-1 shadow-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7928CA] animate-pulse" />
          <span className="text-[10.5px] font-sans-clean font-semibold text-[#17131D] tracking-wide">
            Bridal Couture Brand
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 left-4 z-20 pointer-events-none transition-transform duration-300 hover:scale-105">
        <div className="bg-white/92 backdrop-blur-md border border-[#32106B]/12 rounded-full px-3 py-1 shadow-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4B168C]" />
          <span className="text-[10.5px] font-sans-clean font-semibold text-[#17131D] tracking-wide">
            Brand & Digital Studio
          </span>
        </div>
      </div>

      <div className="absolute bottom-5 right-4 z-20 pointer-events-none transition-transform duration-300 hover:scale-105">
        <div className="bg-white/92 backdrop-blur-md border border-[#32106B]/12 rounded-full px-3 py-1 shadow-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA] animate-ping" />
          <span className="text-[10.5px] font-sans-clean font-semibold text-[#17131D] tracking-wide">
            AI SaaS (Launching 2027)
          </span>
        </div>
      </div>

      {/* Subtle Hint for Users */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-40 hover:opacity-80 transition-opacity">
        <span className="text-[9px] font-sans-clean uppercase tracking-[0.25em] text-[#32106B]">
          Interactive Portfolio Core • Move cursor
        </span>
      </div>
    </div>
  );
};

export default HeroThreeNetwork;
