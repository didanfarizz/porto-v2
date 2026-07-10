/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fix: @react-three/fiber v8 + @types/react v19 incompatibility.
 *
 * In @types/react v19, the JSX namespace lives inside `React.JSX`,
 * not the global `JSX` namespace. R3F v8 only augments the global `JSX` namespace,
 * so all its elements (<primitive>, <mesh>, etc.) are invisible to TypeScript.
 *
 * This file augments `React.JSX.IntrinsicElements` directly to fix the issue.
 * Remove this file once @react-three/fiber officially supports React 19.
 */

import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js / R3F core objects
      primitive: any;
      group: any;
      mesh: any;
      points: any;
      line: any;
      lineLoop: any;
      lineSegments: any;
      instancedMesh: any;
      skinnedMesh: any;
      bone: any;
      sprite: any;

      // Geometries
      bufferGeometry: any;
      boxGeometry: any;
      capsuleGeometry: any;
      circleGeometry: any;
      coneGeometry: any;
      cylinderGeometry: any;
      dodecahedronGeometry: any;
      edgesGeometry: any;
      extrudeGeometry: any;
      icosahedronGeometry: any;
      latheGeometry: any;
      octahedronGeometry: any;
      planeGeometry: any;
      polyhedronGeometry: any;
      ringGeometry: any;
      shapeGeometry: any;
      sphereGeometry: any;
      tetrahedronGeometry: any;
      torusGeometry: any;
      torusKnotGeometry: any;
      tubeGeometry: any;
      wireframeGeometry: any;

      // Materials
      material: any;
      meshBasicMaterial: any;
      meshDepthMaterial: any;
      meshDistanceMaterial: any;
      meshLambertMaterial: any;
      meshMatcapMaterial: any;
      meshNormalMaterial: any;
      meshPhongMaterial: any;
      meshPhysicalMaterial: any;
      meshStandardMaterial: any;
      meshToonMaterial: any;
      lineBasicMaterial: any;
      lineDashedMaterial: any;
      pointsMaterial: any;
      shaderMaterial: any;
      shadowMaterial: any;
      spriteMaterial: any;
      rawShaderMaterial: any;

      // Lights
      ambientLight: any;
      directionalLight: any;
      hemisphereLight: any;
      pointLight: any;
      rectAreaLight: any;
      spotLight: any;

      // Cameras
      perspectiveCamera: any;
      orthographicCamera: any;

      // Helpers
      axesHelper: any;
      gridHelper: any;
      cameraHelper: any;
      directionalLightHelper: any;
    }
  }
}
