import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import {
  Mesh,
  BufferGeometry,
  Float32BufferAttribute,
  BufferAttribute,
  LineSegments,
  LineBasicMaterial,
} from 'three';

export type BoxProps = {
  length: number;
  width: number;
  height: number;
  vertices: { x: number; y: number; z: number }[];
  indices: number[];
  darkMode: boolean;
};

const Box3D: React.FC<BoxProps> = ({ vertices, indices, darkMode }) => {
  const boxRef = useRef<Mesh>(null);
  const geometryRef = useRef<BufferGeometry | null>(null);
  const [edges, setEdges] = useState<LineSegments | null>(null);

  useEffect(() => {
    if (vertices.length > 0 && indices.length > 0) {
      if (geometryRef.current) {
        const geometry = geometryRef.current;
        const vertexArray = new Float32Array(vertices.length * 3);
        vertices.forEach((vertex, i) => {
          vertexArray[i * 3] = vertex.x;
          vertexArray[i * 3 + 1] = vertex.y;
          vertexArray[i * 3 + 2] = vertex.z;
        });
        geometry.setAttribute(
          'position',
          new Float32BufferAttribute(vertexArray, 3)
        );

        const indexArray = new Uint32Array(indices);
        geometry.setIndex(new BufferAttribute(indexArray, 1));

        const edgesGeometry = new THREE.EdgesGeometry(geometry);
        const edgesMaterial = new LineBasicMaterial({
          color: 0x888888,
        });

        const edgesLines = new LineSegments(edgesGeometry, edgesMaterial);
        setEdges(edgesLines);
      } else {
        const geometry = new BufferGeometry();
        const vertexArray = new Float32Array(vertices.length * 3);
        vertices.forEach((vertex, i) => {
          vertexArray[i * 3] = vertex.x;
          vertexArray[i * 3 + 1] = vertex.y;
          vertexArray[i * 3 + 2] = vertex.z;
        });

        geometry.setAttribute(
          'position',
          new Float32BufferAttribute(vertexArray, 3)
        );

        const indexArray = new Uint32Array(indices);
        geometry.setIndex(new BufferAttribute(indexArray, 1));

        geometryRef.current = geometry;

        const edgesGeometry = new THREE.EdgesGeometry(geometry);
        const edgesMaterial = new LineBasicMaterial({
          color: 0x888888,
        });

        const edgesLines = new LineSegments(edgesGeometry, edgesMaterial);
        setEdges(edgesLines);
      }
    }
  }, [vertices, indices]);

  return geometryRef.current ? (
    <>
      <mesh ref={boxRef} geometry={geometryRef.current} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={darkMode ? '#2D2D2D' : '#F5F5F5'}
          metalness={darkMode ? 0.7 : 0.3}
          roughness={darkMode ? 0.4 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      {edges && <primitive object={edges} />}
    </>
  ) : null;
};

export default Box3D;
