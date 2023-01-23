/* eslint-disable react/no-unknown-property */
import './App.css';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { folder, Leva, useControls } from 'leva';
import { Suspense } from 'react';
import { Loader, Sparkles } from '@react-three/drei';

function App() {
  const { size, sparkleSpeed } = useControls({
    sparkles: folder({
      size: { value: 6, min: 2, max: 20, step: 2, label: 'size' },
      sparkleSpeed: { value: 0.25, min: 0, max: 5, step: 0.25, label: 'speed' },
    }),
  });
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Leva />
        <Canvas
          flat
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [1, 2, 8],
          }}
        >
          <color args={['#201919']} attach="background" />
          <Sparkles size={size} scale={[2, 2, 8]} position-y={0} speed={sparkleSpeed} />
          <Experience />
        </Canvas>
      </Suspense>
    </>
  );
}

export default App;
