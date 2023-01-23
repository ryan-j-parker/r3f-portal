/* eslint-disable react/no-unknown-property */
import {
  shaderMaterial,
  useGLTF,
  useTexture,
  Center,
  Sparkles,
  PresentationControls,
} from '@react-three/drei';
import { useControls, folder } from 'leva';
import { useEffect, useRef } from 'react';
import portalVertexShader from './shaders/portal/vertex.js';
import portalfragmentShader from './shaders/portal/fragment.js';
import * as THREE from 'three';
import { useFrame, extend } from '@react-three/fiber';
import Druid from './Druid.js';
import { Fog } from 'three';

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#de83ef'),
    uColorEnd: new THREE.Color('#296d98'),
  },
  portalVertexShader,
  portalfragmentShader
);
extend({ PortalMaterial });

export default function Experience() {
  const portalSpeed = useControls('portal', {
    speed: { value: 0.75, min: 0, max: 5, step: 0.25, label: 'speed' },
  });

  const portalRef = useRef();
  const portalMaterial = useRef();

  useFrame((state, delta) => {
    portalMaterial.current.uTime += portalSpeed.speed * delta;
  });

  const { nodes } = useGLTF('/model/portal.glb');

  const bakedTexture = useTexture('/model/baked.jpg');
  bakedTexture.flipY = false;

  return (
    <>
      <ambientLight />
      <PresentationControls
        makeDefault
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Center>
          <Druid />
          <group ref={portalRef} scale={1.5}>
            <mesh geometry={nodes.baked.geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
            <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
              <meshBasicMaterial color="#ffffe5" />
            </mesh>
            <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
              <meshBasicMaterial color="#ffffe5" />
            </mesh>
            <mesh
              geometry={nodes.portalLight.geometry}
              position={nodes.portalLight.position}
              rotation={nodes.portalLight.rotation}
            >
              <portalMaterial ref={portalMaterial} />
            </mesh>
            <mesh rotation-x={Math.PI * 0.5} receiveShadow>
              <planeGeometry args={[4, 4]} />
              <meshBasicMaterial color="#b39231" />
            </mesh>
          </group>
        </Center>
      </PresentationControls>
    </>
  );
}
