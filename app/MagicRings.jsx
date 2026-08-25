import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./MagicRings.css";

const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime, uAttenuation, uLineThickness;
uniform float uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRingGap, uFadeIn, uFadeOut;
uniform vec2 uResolution;
uniform vec3 uColor, uColorTwo;
uniform int uRingCount;
const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  vec3 c = vec3(0.0);
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    c = mix(c, rc, vec3(ring(p, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px)));
  }
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;
  gl_FragColor = vec4(c, max(c.r, max(c.g, c.b)) * uOpacity);
}
`;

export default function MagicRings({ color = "#ffffff", colorTwo = "#ffffff", speed = 1, ringCount = 6 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mount.classList.add("magic-rings-fallback");
      return () => mount.classList.remove("magic-rings-fallback");
    }
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    } catch {
      mount.classList.add("magic-rings-fallback");
      return;
    }

    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;
    const uniforms = {
      uTime: { value: 0 },
      uAttenuation: { value: 10 },
      uResolution: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Color(color) },
      uColorTwo: { value: new THREE.Color(colorTwo) },
      uLineThickness: { value: 2 },
      uBaseRadius: { value: 0.24 },
      uRadiusStep: { value: 0.085 },
      uScaleRate: { value: 0.12 },
      uRingCount: { value: ringCount },
      uOpacity: { value: 1 },
      uNoiseAmount: { value: 0.025 },
      uRingGap: { value: 1.45 },
      uFadeIn: { value: 0.7 },
      uFadeOut: { value: 0.5 },
    };
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
    const geometry = new THREE.PlaneGeometry(1, 1);
    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width * dpr, height * dpr);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    let frameId = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    const animate = (time) => {
      const delta = Math.min(time - lastTime, 100);
      lastTime = time;
      elapsed += delta * 0.001 * speed;
      uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      } else if (!frameId) {
        lastTime = performance.now();
        frameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [color, colorTwo, ringCount, speed]);

  return <div ref={mountRef} className="magic-rings-container" aria-hidden="true" />;
}
