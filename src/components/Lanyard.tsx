"use client";

/* eslint-disable react/no-unknown-property */

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment, Html, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import cardModel from "./card.glb";
import lanyardTexture from "./lanyard.png";
import styles from "./Lanyard.module.css";

extend({ MeshLineGeometry, MeshLineMaterial });

const cardModelUrl = cardModel;
const lanyardTextureUrl =
  typeof lanyardTexture === "string" ? lanyardTexture : lanyardTexture.src;

type Vector3Tuple = [number, number, number];

type LanyardProps = HTMLAttributes<HTMLDivElement> & {
  position?: Vector3Tuple;
  gravity?: Vector3Tuple;
  fov?: number;
  transparent?: boolean;
  children?: ReactNode;
};

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  className = "",
  children,
  ...rest
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")} {...rest}>
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} badge={children} />
          </Physics>

          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

type BandProps = {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  badge?: ReactNode;
};

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, badge }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardModelUrl) as any;
  const texture = useTexture(lanyardTextureUrl);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );

  const [dragged, setDragged] = useState<false | THREE.Vector3>(false);
  const [hovered, setHovered] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ]);

  useEffect(() => {
    if (!hovered) {
      return;
    }

    document.body.style.cursor = dragged ? "grabbing" : "grab";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [dragged, hovered]);

  useEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    if (materials?.base?.map) {
      materials.base.map.anisotropy = isMobile ? 8 : 16;
      materials.base.map.needsUpdate = true;
    }

    if (materials?.metal) {
      materials.metal.roughness = 0.3;
      materials.metal.needsUpdate = true;
    }
  }, [isMobile, materials, texture]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp?.());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current) {
      return;
    }

    [j1, j2].forEach((ref) => {
      if (!ref.current?.lerped) {
        ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
      }

      const clampedDistance = Math.max(
        0.1,
        Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
      );

      ref.current.lerped.lerp(
        ref.current.translation(),
        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
      );
    });

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.lerped);
    curve.points[2].copy(j1.current.lerped);
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(event) => {
              const target = event.target as
                | {
                    releasePointerCapture?: (pointerId: number) => void;
                  }
                | null;

              target?.releasePointerCapture?.(event.pointerId);
              setDragged(false);
            }}
            onPointerDown={(event) => {
              const target = event.target as
                | {
                    setPointerCapture?: (pointerId: number) => void;
                  }
                | null;

              target?.setPointerCapture?.(event.pointerId);
              setDragged(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
              <mesh geometry={nodes.clip.geometry} material={materials.metal} />
              <mesh geometry={nodes.clamp.geometry} material={materials.metal} />

              {badge ? (
                <Html
                  transform
                  occlude={false}
                  position={[0.02, -0.86, 0.28]}
                  className={styles.badgeHtml}
                  center
                  distanceFactor={0.95}
                  zIndexRange={[40, 0]}
                >
                  <div className={styles.badgeShell}>{badge}</div>
                </Html>
              ) : null}
            </group>
          </RigidBody>
        </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardModelUrl);
useTexture.preload(lanyardTextureUrl);
