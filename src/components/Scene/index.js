import React, { useCallback, useEffect, useRef } from 'react';
import { PointerLockControls, Stats } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import shallow from 'zustand/shallow';

import Player from 'components/Player';
import Floor from 'components/Floor';
import Bricks from 'components/Bricks';
import CameraIdle from 'components/CameraIdle';
import useStore from 'state';

// castShadow
// shadow-mapSize-width={1024 * 10}
// shadow-mapSize-height={1024 * 10}
// shadow-camera-left={50}
// shadow-camera-right={-50}
// shadow-camera-top={50}
// shadow-camera-bottom={-50}

const selector = (s) => ({ isPlaying: s.isPlaying, setIsPlaying: s.setIsPlaying });

function Scene() {
  const { isPlaying, setIsPlaying } = useStore(selector, shallow);
  const ref = useRef();

  useEffect(() => {
    if (ref.current && isPlaying) {
      if (isPlaying) {
        ref.current.lock();
      } else {
        ref.current.unlock();
      }
    }
  }, [isPlaying]);

  const onUnlock = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <>
      <Stats />
      <color attach="background" args={['#ffffff']} />
      <fog attach="fog" args={['#fff', 5, 95]} />

      <directionalLight color="#f5f5f5" position={[-7, 20, 5]} intensity={1.75} />
      <hemisphereLight args={['#fff', '#d87877', 0.2]} />

      <Physics gravity={[0, -23, 0]}>
        <Floor size={100000} />
        <Player />
      </Physics>
      <Bricks />

      {!isPlaying && <CameraIdle />}
      {isPlaying && <PointerLockControls ref={ref} onUnlock={onUnlock} />}
    </>
  );
}

export default Scene;
