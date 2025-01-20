import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { BufferGeometry, Float32BufferAttribute, BufferAttribute, LineSegments, LineBasicMaterial, } from 'three';
var Box3D = function (_a) {
    var vertices = _a.vertices, indices = _a.indices, darkMode = _a.darkMode;
    var boxRef = useRef(null);
    var geometryRef = useRef(null);
    var _b = useState(null), edges = _b[0], setEdges = _b[1];
    useEffect(function () {
        if (vertices.length > 0 && indices.length > 0) {
            if (geometryRef.current) {
                var geometry = geometryRef.current;
                var vertexArray_1 = new Float32Array(vertices.length * 3);
                vertices.forEach(function (vertex, i) {
                    vertexArray_1[i * 3] = vertex.x;
                    vertexArray_1[i * 3 + 1] = vertex.y;
                    vertexArray_1[i * 3 + 2] = vertex.z;
                });
                geometry.setAttribute('position', new Float32BufferAttribute(vertexArray_1, 3));
                var indexArray = new Uint32Array(indices);
                geometry.setIndex(new BufferAttribute(indexArray, 1));
                var edgesGeometry = new THREE.EdgesGeometry(geometry);
                var edgesMaterial = new LineBasicMaterial({
                    color: 0x888888,
                });
                var edgesLines = new LineSegments(edgesGeometry, edgesMaterial);
                setEdges(edgesLines);
            }
            else {
                var geometry = new BufferGeometry();
                var vertexArray_2 = new Float32Array(vertices.length * 3);
                vertices.forEach(function (vertex, i) {
                    vertexArray_2[i * 3] = vertex.x;
                    vertexArray_2[i * 3 + 1] = vertex.y;
                    vertexArray_2[i * 3 + 2] = vertex.z;
                });
                geometry.setAttribute('position', new Float32BufferAttribute(vertexArray_2, 3));
                var indexArray = new Uint32Array(indices);
                geometry.setIndex(new BufferAttribute(indexArray, 1));
                geometryRef.current = geometry;
                var edgesGeometry = new THREE.EdgesGeometry(geometry);
                var edgesMaterial = new LineBasicMaterial({
                    color: 0x888888,
                });
                var edgesLines = new LineSegments(edgesGeometry, edgesMaterial);
                setEdges(edgesLines);
            }
        }
    }, [vertices, indices]);
    return geometryRef.current ? (_jsxs(_Fragment, { children: [_jsx("mesh", { ref: boxRef, geometry: geometryRef.current, position: [0, 0, 0], children: _jsx("meshStandardMaterial", { color: darkMode ? '#2D2D2D' : '#F5F5F5', metalness: darkMode ? 0.7 : 0.3, roughness: darkMode ? 0.4 : 0.6, side: THREE.DoubleSide }) }), edges && _jsx("primitive", { object: edges })] })) : null;
};
export default Box3D;
