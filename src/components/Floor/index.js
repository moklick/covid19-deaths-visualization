import React from 'react';
import { Plane } from '@react-three/drei';
import { usePlane } from '@react-three/cannon';

const rotationX = -Math.PI / 2;

function Floor({ size }) {
  const length = Math.ceil((size / 100) * 2);
  const floorZ = -length / 2 + 100;
  const [ref] = usePlane(() => ({ rotation: [rotationX, 0, 0], position: [0, 0.7, floorZ] }));

  return (
    <>
      <Plane ref={ref} args={[200, length, 4, 4]} visible={false} />
      <Plane
        receiveShadow
        args={[200, length, 4, 4]}
        position={[0, 0, floorZ]}
        rotation-x={rotationX}
      >
        <shadowMaterial attach="material" opacity={0.5} />
      </Plane>
    </>
  );
}

export default Floor;
