'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export function ThreeCanvas({ variant = 'hero' }: { variant?: 'hero' | 'subtle' }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const container = containerRef.current;

    // Check WebGL availability safely
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch (e) {
      setWebGlSupported(false);
      return;
    }

    // Mobile & Reduced Motion checks
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    // Renderer creation with WebGL error handling
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile && variant === 'hero' });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : (variant === 'hero' ? 2 : 1.5)));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL Renderer initialization failed:', err);
      setWebGlSupported(false);
      return;
    }

    // ── 1. FLOATING GOLD PARTICLES ────────────────────────────────────────────────
    // Mobile uses ~10 particles, Desktop uses 18-20 particles per spec
    const particleCount = isMobile ? 10 : (variant === 'hero' ? 18 : 10);
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    const goldColor = new THREE.Color('#E8B93D'); // --color-gold-bright

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 6;

      opacities[i] = 0.3 + Math.random() * 0.4; // 0.3 to 0.7 opacity
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle texture (soft gold circle)
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 16;
    particleCanvas.height = 16;
    const pctx = particleCanvas.getContext('2d');
    if (pctx) {
      const radGrad = pctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      radGrad.addColorStop(0, 'rgba(232, 185, 61, 0.9)');
      radGrad.addColorStop(0.5, 'rgba(212, 160, 23, 0.5)');
      radGrad.addColorStop(1, 'rgba(212, 160, 23, 0)');
      pctx.fillStyle = radGrad;
      pctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.18 : 0.22,
      map: particleTexture,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ── 2. ENGRAVED 3D CUBE SPEC ──────────────────────────────────────────────────
    const cubeGroup = new THREE.Group();

    if (variant === 'hero') {
      // Create canvas for 135deg gradient fill (#0E3B2E to #12281F) with gold engraved inner border
      const faceCanvas = document.createElement('canvas');
      faceCanvas.width = 512;
      faceCanvas.height = 512;
      const ctx = faceCanvas.getContext('2d');
      if (ctx) {
        // 135deg linear gradient
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, '#0E3B2E'); // --color-emerald-deep
        grad.addColorStop(1, '#12281F'); // --color-panel
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // Inset gold glow / border
        ctx.strokeStyle = 'rgba(212, 160, 23, 0.35)'; // gold face border
        ctx.lineWidth = 4;
        ctx.strokeRect(4, 4, 504, 504);

        // Engraved panel inner inset line (inset ~28px on 512px canvas, equivalent to ~14px)
        ctx.strokeStyle = 'rgba(212, 160, 23, 0.18)';
        ctx.lineWidth = 2;
        ctx.strokeRect(28, 28, 456, 456);

        // Soft teal inset glow overlay
        const insetTeal = ctx.createRadialGradient(256, 256, 100, 256, 256, 250);
        insetTeal.addColorStop(0, 'rgba(31, 191, 143, 0.08)');
        insetTeal.addColorStop(1, 'rgba(31, 191, 143, 0.00)');
        ctx.fillStyle = insetTeal;
        ctx.fillRect(0, 0, 512, 512);
      }

      const faceTexture = new THREE.CanvasTexture(faceCanvas);
      const cubeSize = isMobile ? 2.2 : 2.7;
      const boxGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

      const cubeMat = new THREE.MeshStandardMaterial({
        map: faceTexture,
        roughness: 0.4,
        metalness: 0.2,
        transparent: true,
        opacity: 0.85,
      });

      const mainCube = new THREE.Mesh(boxGeo, cubeMat);

      // Gold outer wireframe edges (1px solid rgba(212,160,23,0.35))
      const edgeGeo = new THREE.EdgesGeometry(boxGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0xD4A017,
        transparent: true,
        opacity: 0.45,
      });
      const outerWire = new THREE.LineSegments(edgeGeo, edgeMat);

      // Teal ambient rim light ring (subtle outer wireframe, slightly larger)
      const rimGeo = new THREE.BoxGeometry(cubeSize + 0.08, cubeSize + 0.08, cubeSize + 0.08);
      const rimEdge = new THREE.EdgesGeometry(rimGeo);
      const rimMat = new THREE.LineBasicMaterial({
        color: 0x1FBF8F, // --color-teal-accent
        transparent: true,
        opacity: 0.15,
      });
      const rimWire = new THREE.LineSegments(rimEdge, rimMat);

      cubeGroup.add(mainCube, outerWire, rimWire);
      scene.add(cubeGroup);
    }

    // ── LIGHTING ──────────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
    scene.add(ambientLight);

    const tealRimLight = new THREE.PointLight(0x1FBF8F, 1.2, 30);
    tealRimLight.position.set(-5, 4, 3);
    scene.add(tealRimLight);

    const goldPointLight = new THREE.PointLight(0xE8B93D, 1.5, 30);
    goldPointLight.position.set(5, -4, 4);
    scene.add(goldPointLight);

    // Mouse Tracking (hero only)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    if (variant === 'hero' && !isMobile && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── ANIMATION LOOP ────────────────────────────────────────────────────────────
    // Slow, continuous rotation over ~16s (rotateX + rotateY linear)
    const ROTATION_SPEED_Y = (2 * Math.PI) / 16; // Full 360deg over 16 seconds
    const ROTATION_SPEED_X = (2 * Math.PI) / 22; // Slightly different axis offset

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (document.hidden) return;

      const elapsedTime = clock.getElapsedTime();

      // If user prefers reduced motion, render a static high-quality frame without spinning
      if (!prefersReducedMotion) {
        if (variant === 'hero') {
          cubeGroup.rotation.y = elapsedTime * ROTATION_SPEED_Y;
          cubeGroup.rotation.x = elapsedTime * ROTATION_SPEED_X;

          // Parallax effect
          targetX += (mouseX - targetX) * 0.04;
          targetY += (mouseY - targetY) * 0.04;
          camera.position.x = targetX * 1.2;
          camera.position.y = -targetY * 1.2;
          camera.lookAt(scene.position);
        }

        // Particle floating pulse
        const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < particleCount; i++) {
          const y = posAttr.getY(i);
          // Gentle floating translateY pulse
          posAttr.setY(i, y + Math.sin(elapsedTime * 0.5 + i) * 0.002);
        }
        posAttr.needsUpdate = true;

        particles.rotation.y = elapsedTime * 0.03;
      } else {
        // Static angle for reduced motion
        cubeGroup.rotation.y = Math.PI / 6;
        cubeGroup.rotation.x = Math.PI / 8;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // ── Cleanup ───────────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      try {
        renderer.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        particleTexture.dispose();
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      } catch (e) {
        console.warn('WebGL cleanup warning:', e);
      }
    };
  }, [variant]);

  // Static Fallback if WebGL fails to initialize
  if (!webGlSupported) {
    return (
      <div
        className="absolute inset-0 z-0 pointer-events-none w-full h-full bg-[radial-gradient(ellipse_at_top,var(--color-emerald-deep)_0%,var(--color-emerald-bg)_85%)] opacity-60"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none w-full h-full ${
        variant === 'hero' ? 'opacity-60' : 'opacity-35'
      }`}
    />
  );
}
