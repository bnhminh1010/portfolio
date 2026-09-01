"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

interface ThreeHalftoneCanvasProps {
  className?: string;
}

export function ThreeHalftoneCanvas({ className = "" }: ThreeHalftoneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 2. Uniforms for Venice Ocean Caustics Shader
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_target_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_scroll: { value: 0 },
      u_target_scroll: { value: 0 },
      u_stir: { value: 0.0 },
      u_target_stir: { value: 0.0 },
      u_stir_pos: { value: new THREE.Vector2(0.5, 0.5) },
    };

    // 3. GLSL Shaders: 04 Venice Adriatic Emerald Caustics (1.5x Dynamic Speed)
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_scroll;
      uniform float u_stir;
      uniform vec2 u_stir_pos;
      varying vec2 vUv;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                           -0.577350269189626,
                            0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      vec2 rotate2D(vec2 v, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c) * v;
      }

      // Rotated 45-degree halftone print screen with distinct grey dots
      vec3 applyRotatedHalftone(vec3 color, vec2 fragCoord, float spacing, float dotSize, float darkness) {
        vec2 rotCoord = rotate2D(fragCoord, 0.785398);
        vec2 cell = fract(rotCoord / spacing) - 0.5;
        float dist = length(cell);
        // Anti-aliased clean dot boundary
        float mask = 1.0 - smoothstep(dotSize - 0.05, dotSize + 0.05, dist);
        // Distinct charcoal-grey dot tone
        vec3 dotGrey = vec3(0.015, 0.025, 0.038);
        return mix(color, dotGrey, mask * darkness);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.y = 1.0 - st.y;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = st;
        p.x *= aspect;

        // Dynamic Wave & Caustic Velocity
        float scrollOffset = u_scroll * 1.5;
        float speed = 0.18 + u_stir * 0.08;
        float t = u_time * speed + scrollOffset * 0.2;

        // Interactive Water Ripple
        vec2 stirOrigin = u_stir_pos;
        stirOrigin.x *= aspect;
        float distToStir = distance(p, stirOrigin);
        float stirWave = sin(distToStir * 44.0 - u_time * 6.5) * exp(-distToStir * 11.5) * u_stir * 0.10;

        // Softly blurred gentle ocean wave undulations
        vec2 waveUv = rotate2D(p, 0.38);
        float w1 = sin(waveUv.x * 2.4 + waveUv.y * 1.1 + t * 1.05 + stirWave);
        float w2 = sin(waveUv.x * 4.8 - waveUv.y * 2.0 - t * 0.85);
        float wave = w1 * 0.6 + w2 * 0.4;

        // Soft blurred multi-octave water caustic mesh
        vec2 cCoord = p * 3.6 + vec2(t * 0.22, t * 0.15) + stirWave * 0.30;
        float n1 = snoise(cCoord);
        float n2 = snoise(cCoord * 1.6 - vec2(t * 0.16));
        float n3 = snoise(cCoord * 0.8 + vec2(t * 0.12));
        float caustics = smoothstep(0.12, 0.88, (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) * 0.5 + 0.5);

        // Localized shimmer around cursor
        caustics += u_stir * exp(-distToStir * 12.0) * 0.22;

        // Venetian Adriatic Emerald Color Palette
        vec3 cAdriaticDeep  = vec3(0.035, 0.12, 0.20);
        vec3 cEmeraldLagoon = vec3(0.10, 0.42, 0.46);
        vec3 cSapphireBlue  = vec3(0.14, 0.48, 0.68);
        vec3 cCrystalAqua   = vec3(0.28, 0.64, 0.74);
        vec3 cSunlightFoam  = vec3(0.48, 0.80, 0.88);

        vec3 col = cAdriaticDeep;
        col = mix(col, cEmeraldLagoon, smoothstep(-0.4, 0.4, wave) * 0.88);
        col = mix(col, cSapphireBlue, smoothstep(0.1, 0.7, caustics) * 0.82);
        col = mix(col, cCrystalAqua, caustics * 0.70);
        col = mix(col, cSunlightFoam, pow(caustics, 2.8) * 0.50);

        // Apply Rotated Halftone Print Screen (Clearly visible grey micro-dots)
        col = applyRotatedHalftone(col, gl_FragCoord.xy, 6.2, 0.22, 0.55);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. Global Event Listeners & Bridge
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      uniforms.u_target_mouse.value.set(x, y);
    };

    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      uniforms.u_target_scroll.value = window.scrollY / maxScroll;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };

    // Custom Window Bridge for Footer "Hold to create waves" interaction
    (window as unknown as { __setOceanStir?: (stir: number, x?: number, y?: number) => void }).__setOceanStir = (
      stir: number,
      x?: number,
      y?: number
    ) => {
      uniforms.u_target_stir.value = stir;
      if (typeof x === "number" && typeof y === "number") {
        uniforms.u_stir_pos.value.set(x, y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // 5. Render Loop (120 FPS capable)
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (prefersReduced) {
        renderer.render(scene, camera);
        return;
      }

      const delta = clock.getDelta();
      uniforms.u_time.value += delta;

      // Smooth interpolation for mouse, scroll, and stir pressure
      uniforms.u_mouse.value.lerp(uniforms.u_target_mouse.value, 0.06);
      uniforms.u_scroll.value += (uniforms.u_target_scroll.value - uniforms.u_scroll.value) * 0.08;
      uniforms.u_stir.value += (uniforms.u_target_stir.value - uniforms.u_stir.value) * 0.12;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      delete (window as unknown as { __setOceanStir?: unknown }).__setOceanStir;

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [prefersReduced]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      <div ref={containerRef} className="absolute inset-0" />
      {/* Subtle atmospheric vignette (without CSS blur so grey halftone dots stay clearly visible) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(10,14,20,0.02) 0%, rgba(6,8,12,0.30) 100%)",
        }}
      />
    </div>
  );
}
