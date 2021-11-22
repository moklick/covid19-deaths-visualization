import React from 'react';
import { Physics } from '@react-three/cannon';

import Player from 'components/Player';
import Floor from 'components/Floor';
import Bricks from 'components/Bricks';
import Controls from 'components/Controls';
import { hasTouch } from 'utils/browser-utils';

function Scene() {
  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <fog attach="fog" args={['#fff', 5, 95]} />
      <directionalLight color="#ffffff" position={[-4, 10, 5]} intensity={1.5} />
      <directionalLight color="#ffffff" position={[10, 10, -5]} intensity={0.5} />
      <hemisphereLight args={['#fff', '#d87877', 0.2]} />
      {!hasTouch && (
        <Physics gravity={[0, -23, 0]}>
          <Floor />
          <Player />
        </Physics>
      )}
      <Bricks />
      <Controls />
    </>
  );
}

export default Scene;
