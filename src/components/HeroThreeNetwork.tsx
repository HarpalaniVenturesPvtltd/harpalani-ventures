import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

interface NodeData {
  name: string;
  category: string;
  status: string;
  position: [number, number, number];
  color: number;
}

const VENTURE_NODES: NodeData[] = [
  {
    name: "Beautiful The Boutique",
    category: "Retail Designer Store",
    status: "Active Venture",
    position: [-2.1, 1.3, 0.4],
    color: 0x6F2DBD,
  },
  {
    name: "Cilaee Cadaee",
    category: "Bridal & Ethnic Couture",
    status: "Active Brand",
    position: [2.2, 1.1, -0.3],
    color: 0x8B5CF6,
  },
  {
    name: "Blaze Graphics",
    category: "Brand & Digital Studio",
    status: "Active Studio",
    position: [-1.8, -1.4, -0.2],
    color: 0x9333EA,
  },
  {
    name: "QuoteFlow AI",
    category: "AI Quotation SaaS",
    status: "Launching 2027",
    position: [1.9, -1.3, 0.5],
    color: 0xC084FC,
  },
];

export const HeroThreeNetwork: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

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
      return; // Fallback handled gracefully
    }

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 520;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // Root interactive group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Subtle atmospheric lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xE9D8FD, 2.2);
    dirLight1.position.set(5, 6, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x6F2DBD, 1.8);
    dirLight2.position.set(-5, -4, 4);
    scene.add(dirLight2);

    // Central Core Monogram Nexus Sphere (representing Harpalani Ventures Parent Hub)
    const coreGeometry = new THREE.IcosahedronGeometry(0.85, 4);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x32106B,
      metalness: 0.25,
      roughness: 0.15,
      transmission: 0.45,
      ior: 1.5,
      thickness: 1.2,
      specularIntensity: 1.0,
      specularColor: 0xffffff,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    networkGroup.add(coreMesh);

    // Concentric delicate architectural orbit rings around the core
    const ringMaterials = [
      new THREE.LineBasicMaterial({ color: 0x6F2DBD, transparent: true, opacity: 0.35 }),
      new THREE.LineBasicMaterial({ color: 0x32106B, transparent: true, opacity: 0.2 }),
      new THREE.LineBasicMaterial({ color: 0xA855F7, transparent: true, opacity: 0.25 }),
    ];

    const rings: THREE.Line[] = [];
    [1.6, 2.5, 3.2].forEach((radius, i) => {
      const ringGeom = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 128;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      ringGeom.setFromPoints(points);
      const ring = new THREE.Line(ringGeom, ringMaterials[i]);
      ring.rotation.x = Math.PI * 0.25 * (i + 1);
      ring.rotation.y = Math.PI * 0.15 * (i + 1);
      networkGroup.add(ring);
      rings.push(ring);
    });

    // Venture Node Geometries and Connecting Lines
    const nodeMeshes: THREE.Mesh[] = [];
    const lineGeometries: THREE.BufferGeometry[] = [];

    VENTURE_NODES.forEach((node) => {
      // Node Sphere
      const nodeGeom = new THREE.SphereGeometry(0.32, 32, 32);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        roughness: 0.25,
        metalness: 0.35,
        emissive: node.color,
        emissiveIntensity: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.set(...node.position);
      networkGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // Outer delicate halo ring for each node
      const haloGeom = new THREE.RingGeometry(0.38, 0.42, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x6F2DBD,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const haloMesh = new THREE.Mesh(haloGeom, haloMat);
      haloMesh.position.copy(nodeMesh.position);
      haloMesh.lookAt(camera.position);
      networkGroup.add(haloMesh);

      // Connecting Line to Center Core
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...node.position),
      ];
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x6F2DBD,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      networkGroup.add(line);
      lineGeometries.push(lineGeom);
    });

    // Inter-venture connection lines (creating an interconnected mesh ecosystem)
    const meshConnections = [
      [VENTURE_NODES[0].position, VENTURE_NODES[1].position],
      [VENTURE_NODES[1].position, VENTURE_NODES[3].position],
      [VENTURE_NODES[3].position, VENTURE_NODES[2].position],
      [VENTURE_NODES[2].position, VENTURE_NODES[0].position],
    ];

    meshConnections.forEach(([p1, p2]) => {
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...p1),
        new THREE.Vector3(...p2),
      ]);
      const lineMat = new THREE.LineDashedMaterial({
        color: 0x32106B,
        dashSize: 0.15,
        gapSize: 0.1,
        transparent: true,
        opacity: 0.22,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      line.computeLineDistances();
      networkGroup.add(line);
    });

    // Mouse Parallax Interaction
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = nx * 0.4;
      targetY = ny * 0.35;
    };

    window.addEventListener("mousemove", handlePointerMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!shouldReduceMotion) {
        // Smooth parallax interpolation
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        networkGroup.rotation.y = currentX + Math.sin(elapsedTime * 0.3) * 0.08;
        networkGroup.rotation.x = -currentY + Math.cos(elapsedTime * 0.25) * 0.05;

        // Subtle rotation of inner orbital rings
        rings.forEach((ring, idx) => {
          ring.rotation.z = elapsedTime * (0.05 * (idx % 2 === 0 ? 1 : -1));
        });

        // Breathing pulse on the core
        const scale = 1 + Math.sin(elapsedTime * 1.2) * 0.02;
        coreMesh.scale.set(scale, scale, scale);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Responsive Resize Handler
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
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [shouldReduceMotion]);

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto select-none">
      {/* Soft Ambient Radial Purple Backdrop */}
      <div 
        className="absolute inset-0 bg-radial from-[#EDE5F7]/70 via-[#F8F6FB]/40 to-transparent rounded-full blur-2xl pointer-events-none" 
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white/92 backdrop-blur-md border border-[#32106B]/15 shadow-[0_8px_28px_rgba(50,16,107,0.14)]"
      >
        <span className="font-serif-luxury font-bold text-xl text-[#32106B] tracking-wider leading-none">
          HV
        </span>
        <span className="text-[7.5px] font-sans-clean font-semibold tracking-[0.25em] text-[#6F2DBD] uppercase mt-1">
          GROUP
        </span>
      </div>

      {/* Venture Node Badges on Overlay */}
      <div className="absolute top-6 left-2 z-20 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md border border-[#32106B]/12 rounded-full px-3 py-1 shadow-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6F2DBD]" />
          <span className="text-[10px] font-sans-clean font-semibold text-[#17131D] tracking-wide">
            Retail Designer Store
          </span>
        </div>
      </div>

      <div className="absolute top-8 right-2 z-20 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md border border-[#32106B]/12 rounded-full px-3 py-1 shadow-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
          <span className="text-[10px] font-sans-clean font-semibold text-[#17131D] tracking-wide">
            Bridal Couture Brand
          </span>
        </div>
      </div>

      <div className="absolute bottom-10 left-4 z-20 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md border border-[#32106B]/12 rounded-full px-3 py-1 shadow-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
          <span className="text-[10px] font-sans-clean font-semibold text-[#17131D] tracking-wide">
            Brand & Digital Studio
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 right-4 z-20 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md border border-[#32106B]/12 rounded-full px-3 py-1 shadow-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
          <span className="text-[10px] font-sans-clean font-semibold text-[#17131D] tracking-wide">
            AI SaaS (Launching 2027)
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroThreeNetwork;
