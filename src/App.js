/* eslint-disable react/no-unknown-property */
import './App.css';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';

function App() {
  return (
    <>
      <Leva 
        
      />
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [1, 2, 8],
        }}
      >
        <color args={['#201919']} attach="background" />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
