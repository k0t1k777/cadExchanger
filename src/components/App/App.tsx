import './App.css';
import React, { useRef, useState, useCallback } from 'react';
import Box3D from '../Box3D/Box3D';
import BoxForm from '../BoxForm/BoxForm';
import { Button, Layout } from 'antd';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

type BoxParams = {
  length: number;
  width: number;
  height: number;
  vertices: { x: number; y: number; z: number }[];
  indices: number[];
};

const App: React.FC = () => {
  const orbitControlsRef = useRef<any>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [boxParams, setBoxParams] = useState<BoxParams>({
    length: 1,
    width: 1,
    height: 1,
    vertices: [],
    indices: [],
  });

  const handleFormSubmit = useCallback(
    async (params: { length: number; width: number; height: number }) => {
      if (
        params.length !== boxParams.length ||
        params.width !== boxParams.width ||
        params.height !== boxParams.height
      ) {
        try {
          const response = await axios.post(
            'http://....glitch.me/compute-box',
            params
          );
          setBoxParams({
            length: params.length,
            width: params.width,
            height: params.height,
            vertices: response.data.vertices,
            indices: response.data.indices,
          });
          setIsDataLoaded(true);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    },
    [boxParams]
  );

  const zoomMinus = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.dollyIn(1.1);
      orbitControlsRef.current.update();
    }
  };

  const zoomPlus = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.dollyOut(1.1);
      orbitControlsRef.current.update();
    }
  };

  const toggleTheme = (checked: boolean) => {
    setDarkMode(checked);
  };

  return (
    <Layout className={darkMode ? 'dark-mode' : ''}>
      <Layout.Content className='layout' style={{ backgroundColor: darkMode ? '#011627' : '#333' }}>
        <BoxForm
          onSubmit={handleFormSubmit}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
        <div className='canvas'>
          <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
            <ambientLight color={darkMode ? 0x404040 : 0xffffff} />
            <pointLight position={[10, 10, 10]} />
            <Box3D
              length={boxParams.length}
              width={boxParams.width}
              height={boxParams.height}
              vertices={boxParams.vertices}
              indices={boxParams.indices}
              darkMode={darkMode}
            />
            <OrbitControls ref={orbitControlsRef} />
          </Canvas>
        </div>
        <div className={`controls ${isDataLoaded ? 'show' : ''}`}>
          <Button onClick={zoomPlus}>+</Button>
          <Button onClick={zoomMinus}>-</Button>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default App;
