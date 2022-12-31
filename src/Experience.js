/* eslint-disable react/no-unknown-property */
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useControls, folder } from 'leva';
import { useRef } from 'react';

export default function Experience() {
  const { nodes } = useGLTF('/model/portal.glb');
  console.log(nodes);

  const { scale } = useControls({
    scale: { value: 1.5, min: 0.1, max: 3.5, step: 0.1 },
  });

  const position = useControls({
    position: folder({
      x: { value: 0, min: -10, max: 10, step: 1 },
      y: { value: 0, min: -10, max: 10, step: 1 },
      z: { value: 0, min: -10, max: 10, step: 1 },
    }),
  });

  const rotation = useControls({
    rotation: folder({
      x: { value: 0, min: -3.14, max: 3.14, step: 0.01 },
      y: { value: 0, min: -3.14, max: 3.14, step: 0.01 },
      z: { value: 0, min: -3.14, max: 3.14, step: 0.01 },
    }),
  });

  const portalRef = useRef();

  return (
    <>
      <OrbitControls makeDefault />
      <group
        ref={portalRef}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        // position={position}
      >
        <mesh
          scale={scale}
          // position={[position.x, position.y, position.z]}
          geometry={nodes.baked.geometry}
        />
      </group>
    </>
  );
}
