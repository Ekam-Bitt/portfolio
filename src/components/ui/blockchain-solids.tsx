"use client";

import * as Three from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, N8AO, Bloom } from "@react-three/postprocessing";
import { easing } from "maath";

const TOP_COUNT = 800;
const BOTTOM_COUNT = 400;
const DISPLACEMENT = 2;
const INTENSITY = 1;
const CONNECTION_DIST = 3.5;

// Shared geometry and material
const geometry = new Three.OctahedronGeometry(0.3, 0);
const material = new Three.MeshStandardMaterial({
    roughness: 0.5,
    metalness: 0.1,
    color: "#ffffff"
});

// Helper to generate a random point inside a tetrahedron defined by 4 vertices
function randomPointInTetrahedron(a: Three.Vector3, b: Three.Vector3, c: Three.Vector3, d: Three.Vector3) {
    let r1 = Math.random();
    let r2 = Math.random();
    let r3 = Math.random();

    if (r1 + r2 > 1) {
        r1 = 1 - r1;
        r2 = 1 - r2;
    }
    if (r2 + r3 > 1) {
        const temp = r3;
        r3 = 1 - r1 - r2;
        r2 = 1 - temp;
    } else if (r1 + r2 + r3 > 1) {
        const temp = r3;
        r3 = r1 + r2 + r3 - 1;
        r1 = 1 - r2 - temp;
    }

    const w = 1 - r1 - r2 - r3;

    return new Three.Vector3()
        .addScaledVector(a, r1)
        .addScaledVector(b, r2)
        .addScaledVector(c, r3)
        .addScaledVector(d, w);
}

function TopMesh() {
    const meshRef = useRef<Three.InstancedMesh>(null);
    const linesRef = useRef<Three.LineSegments>(null);
    const { camera } = useThree();

    const cursor = useMemo(() => new Three.Vector3(), []);
    const oPos = useMemo(() => new Three.Vector3(), []);
    const vec = useMemo(() => new Three.Vector3(), []);
    const dir = useMemo(() => new Three.Vector3(), []);

    const linePositions = useMemo(() => new Float32Array(TOP_COUNT * TOP_COUNT * 3), []);
    const lineGeometry = useMemo(() => {
        const geo = new Three.BufferGeometry();
        geo.setAttribute('position', new Three.BufferAttribute(linePositions, 3));
        return geo;
    }, [linePositions]);

    const { positions, dummies, colors } = useMemo(() => {
        const pos = [];
        const dums = [];
        const cols = [];

        // Vertices derived from SVG analysis (Scaled)
        // Top Mesh Vertices
        const TopTip = new Three.Vector3(0, 10.9, 0);
        const WaistLeft = new Three.Vector3(-7, 0, 0);
        const WaistRight = new Three.Vector3(7, 0, 0);
        const WaistFront = new Three.Vector3(0, 3.1, 3.5);
        const WaistBack = new Three.Vector3(0, 3.1, -3.5);
        const BottomTip = new Three.Vector3(0, -4.0, 0);

        // Define Volumes (Tetrahedrons)
        // Upper Half: TopTip -> Waist
        // Lower Half: Waist -> BottomTip

        for (let i = 0; i < TOP_COUNT; i++) {
            let p = new Three.Vector3();
            const zone = Math.random();
            let colorHex = 0xffffff;

            if (zone < 0.5) {
                // Upper Half (Top Pyramid)
                const subZone = Math.random();
                if (subZone < 0.25) { // Front Right
                    p = randomPointInTetrahedron(TopTip, WaistRight, WaistFront, new Three.Vector3(0, 5, 0));
                    colorHex = 0xB8FBF6; // Top Right (Green)
                } else if (subZone < 0.5) { // Front Left
                    p = randomPointInTetrahedron(TopTip, WaistLeft, WaistFront, new Three.Vector3(0, 5, 0));
                    colorHex = 0xEECBC0; // Top Left (Yellow/Pink)
                } else if (subZone < 0.75) { // Back Right
                    p = randomPointInTetrahedron(TopTip, WaistRight, WaistBack, new Three.Vector3(0, 5, 0));
                    colorHex = 0xB8FBF6;
                } else { // Back Left
                    p = randomPointInTetrahedron(TopTip, WaistLeft, WaistBack, new Three.Vector3(0, 5, 0));
                    colorHex = 0xEECBC0;
                }
            } else {
                // Lower Half (Inverted Pyramid part of Top Mesh)
                const subZone = Math.random();
                if (subZone < 0.25) { // Front Right
                    p = randomPointInTetrahedron(WaistRight, WaistFront, BottomTip, new Three.Vector3(0, 0, 0));
                    colorHex = 0xCAB3F5; // Middle Right (Purple)
                } else if (subZone < 0.5) { // Front Left
                    p = randomPointInTetrahedron(WaistLeft, WaistFront, BottomTip, new Three.Vector3(0, 0, 0));
                    colorHex = 0x87A9F0; // Middle Left (Blue)
                } else if (subZone < 0.75) { // Back Right
                    p = randomPointInTetrahedron(WaistRight, WaistBack, BottomTip, new Three.Vector3(0, 0, 0));
                    colorHex = 0xCAB3F5;
                } else { // Back Left
                    p = randomPointInTetrahedron(WaistLeft, WaistBack, BottomTip, new Three.Vector3(0, 0, 0));
                    colorHex = 0x87A9F0;
                }
            }

            pos.push(p);
            const dummy = new Three.Object3D();
            dummy.position.copy(p);
            dummy.updateMatrix();
            dums.push(dummy);

            const color = new Three.Color(colorHex);
            color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.05);
            cols.push(color);
        }
        return { positions: pos, dummies: dums, colors: cols };
    }, []);

    useEffect(() => {
        if (meshRef.current) {
            colors.forEach((color, i) => meshRef.current!.setColorAt(i, color));
            meshRef.current.instanceColor!.needsUpdate = true;
        }
    }, [colors]);

    useFrame((state, delta) => {
        const mesh = meshRef.current;
        const lines = linesRef.current;
        if (!mesh || !lines) return;

        cursor.set(state.pointer.x, state.pointer.y, 0.5).unproject(camera);
        dir.copy(cursor).sub(camera.position).normalize();
        cursor.add(dir.multiplyScalar(camera.position.length()));

        const currentPositions: Three.Vector3[] = [];

        dummies.forEach((dummy, i) => {
            oPos.copy(positions[i]);
            const dist = oPos.distanceTo(cursor);
            const distInv = DISPLACEMENT - dist;
            const mov = 1 + Math.sin(state.clock.elapsedTime * 2 + 1000 * i);
            dir.copy(oPos).sub(cursor).normalize();
            const targetPos = dist > DISPLACEMENT
                ? oPos
                : vec.copy(oPos).add(dir.multiplyScalar(distInv * INTENSITY + mov / 4));
            easing.damp3(dummy.position, targetPos, 0.2, delta);
            dummy.rotation.x += delta * 0.2;
            dummy.rotation.y += delta * 0.2;
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
            currentPositions.push(dummy.position.clone());
        });
        mesh.instanceMatrix.needsUpdate = true;

        let vertexIndex = 0;
        const positionsArray = lines.geometry.attributes.position.array as Float32Array;
        const STEP = 3;
        for (let i = 0; i < TOP_COUNT; i += STEP) {
            for (let j = i + 1; j < TOP_COUNT; j += STEP) {
                const dist = currentPositions[i].distanceTo(currentPositions[j]);
                if (dist < CONNECTION_DIST) {
                    positionsArray[vertexIndex++] = currentPositions[i].x;
                    positionsArray[vertexIndex++] = currentPositions[i].y;
                    positionsArray[vertexIndex++] = currentPositions[i].z;
                    positionsArray[vertexIndex++] = currentPositions[j].x;
                    positionsArray[vertexIndex++] = currentPositions[j].y;
                    positionsArray[vertexIndex++] = currentPositions[j].z;
                }
            }
        }
        lines.geometry.setDrawRange(0, vertexIndex / 3);
        lines.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <>
            <instancedMesh ref={meshRef} args={[geometry, material, TOP_COUNT]} />
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </lineSegments>
        </>
    );
}

function BottomMesh() {
    const meshRef = useRef<Three.InstancedMesh>(null);
    const linesRef = useRef<Three.LineSegments>(null);
    const { camera } = useThree();

    const cursor = useMemo(() => new Three.Vector3(), []);
    const oPos = useMemo(() => new Three.Vector3(), []);
    const vec = useMemo(() => new Three.Vector3(), []);
    const dir = useMemo(() => new Three.Vector3(), []);

    const linePositions = useMemo(() => new Float32Array(BOTTOM_COUNT * BOTTOM_COUNT * 3), []);
    const lineGeometry = useMemo(() => {
        const geo = new Three.BufferGeometry();
        geo.setAttribute('position', new Three.BufferAttribute(linePositions, 3));
        return geo;
    }, [linePositions]);

    const { positions, dummies, colors } = useMemo(() => {
        const pos = [];
        const dums = [];
        const cols = [];

        // Bottom Mesh Vertices (Wide Start)
        // Top Outer: Matches Top Mesh Waist Width (-7, 7) but shifted down
        const TopLeft = new Three.Vector3(-7, -1.1, 0);
        const TopRight = new Three.Vector3(7, -1.1, 0);

        // Top Inner (V-Shape): Matches Top Mesh Waist Inner but shifted down
        const TopFront = new Three.Vector3(0, -5.1, 3.5);
        const TopBack = new Three.Vector3(0, -5.1, -3.5);

        // Bottom Tip
        const BottomTip = new Three.Vector3(0, -10.3, 0);

        for (let i = 0; i < BOTTOM_COUNT; i++) {
            let p = new Three.Vector3();
            let colorHex = 0xffffff;

            const subZone = Math.random();
            if (subZone < 0.25) { // Front Right
                p = randomPointInTetrahedron(TopRight, TopFront, BottomTip, new Three.Vector3(2, -5, 1));
                colorHex = 0xC8B2F5; // Bottom Right (Purple)
            } else if (subZone < 0.5) { // Front Left
                p = randomPointInTetrahedron(TopLeft, TopFront, BottomTip, new Three.Vector3(-2, -5, 1));
                colorHex = 0xEECBC0; // Bottom Left (Yellow/Pink)
            } else if (subZone < 0.75) { // Back Right
                p = randomPointInTetrahedron(TopRight, TopBack, BottomTip, new Three.Vector3(2, -5, -1));
                colorHex = 0xC8B2F5;
            } else { // Back Left
                p = randomPointInTetrahedron(TopLeft, TopBack, BottomTip, new Three.Vector3(-2, -5, -1));
                colorHex = 0xEECBC0;
            }

            pos.push(p);
            const dummy = new Three.Object3D();
            dummy.position.copy(p);
            dummy.updateMatrix();
            dums.push(dummy);

            const color = new Three.Color(colorHex);
            color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.05);
            cols.push(color);
        }
        return { positions: pos, dummies: dums, colors: cols };
    }, []);

    useEffect(() => {
        if (meshRef.current) {
            colors.forEach((color, i) => meshRef.current!.setColorAt(i, color));
            meshRef.current.instanceColor!.needsUpdate = true;
        }
    }, [colors]);

    useFrame((state, delta) => {
        const mesh = meshRef.current;
        const lines = linesRef.current;
        if (!mesh || !lines) return;

        cursor.set(state.pointer.x, state.pointer.y, 0.5).unproject(camera);
        dir.copy(cursor).sub(camera.position).normalize();
        cursor.add(dir.multiplyScalar(camera.position.length()));

        const currentPositions: Three.Vector3[] = [];

        dummies.forEach((dummy, i) => {
            oPos.copy(positions[i]);
            const dist = oPos.distanceTo(cursor);
            const distInv = DISPLACEMENT - dist;
            const mov = 1 + Math.sin(state.clock.elapsedTime * 2 + 1000 * i);
            dir.copy(oPos).sub(cursor).normalize();
            const targetPos = dist > DISPLACEMENT
                ? oPos
                : vec.copy(oPos).add(dir.multiplyScalar(distInv * INTENSITY + mov / 4));
            easing.damp3(dummy.position, targetPos, 0.2, delta);
            dummy.rotation.x += delta * 0.2;
            dummy.rotation.y += delta * 0.2;
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
            currentPositions.push(dummy.position.clone());
        });
        mesh.instanceMatrix.needsUpdate = true;

        let vertexIndex = 0;
        const positionsArray = lines.geometry.attributes.position.array as Float32Array;
        const STEP = 2;
        for (let i = 0; i < BOTTOM_COUNT; i += STEP) {
            for (let j = i + 1; j < BOTTOM_COUNT; j += STEP) {
                const dist = currentPositions[i].distanceTo(currentPositions[j]);
                if (dist < CONNECTION_DIST) {
                    positionsArray[vertexIndex++] = currentPositions[i].x;
                    positionsArray[vertexIndex++] = currentPositions[i].y;
                    positionsArray[vertexIndex++] = currentPositions[i].z;
                    positionsArray[vertexIndex++] = currentPositions[j].x;
                    positionsArray[vertexIndex++] = currentPositions[j].y;
                    positionsArray[vertexIndex++] = currentPositions[j].z;
                }
            }
        }
        lines.geometry.setDrawRange(0, vertexIndex / 3);
        lines.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <>
            <instancedMesh ref={meshRef} args={[geometry, material, BOTTOM_COUNT]} />
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </lineSegments>
        </>
    );
}

export function BlockchainSolids() {
    return (
        <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 50], fov: 35 }}
                style={{ pointerEvents: 'auto' }}
            >
                <ambientLight intensity={2} />
                <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} intensity={2} />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#ffffff" />

                <TopMesh />
                <BottomMesh />

                <EffectComposer>
                    <N8AO aoRadius={1} intensity={1} />
                    <Bloom mipmapBlur luminanceThreshold={1} levels={7} intensity={0.8} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
