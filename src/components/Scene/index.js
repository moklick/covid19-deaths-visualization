import React, { useCallback, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { PointerLockControls, Stats } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import shallow from 'zustand/shallow';

import Player from 'components/Player';
import Floor from 'components/Floor';
import Bricks from 'components/Bricks';
import CameraIdle from 'components/CameraIdle';
import useStore from 'state';

const selector = (s) => ({ isPlaying: s.isPlaying, setIsPlaying: s.setIsPlaying });

function Scene() {
  const ref = useRef();
  const { isPlaying, setIsPlaying } = useStore(selector, shallow);
  const three = useThree();

  useEffect(() => {
    if (ref.current && isPlaying) {
      if (isPlaying) {
        ref.current.lock();
      } else {
        ref.current.unlock();
      }
    }

    three.gl.shadowMap.needsUpdate = true;
  }, [isPlaying]);

  const onUnlock = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <>
      <Stats />
      <color attach="background" args={['#ffffff']} />
      <fog attach="fog" args={['#fff', 5, 95]} />

      <directionalLight
        color="#f5f5f5"
        position={[-5, 10, -5]}
        intensity={1.75}
        castShadow
        shadow-mapSize-width={1024 * 10}
        shadow-mapSize-height={1024 * 10}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <directionalLight color="#f5f5f5" position={[10, 20, 5]} intensity={1} />
      <hemisphereLight args={['#fff', '#d87877', 0.2]} />

      <Physics gravity={[0, -23, 0]}>
        <Floor />
        <Player />
      </Physics>
      <Bricks />

      {!isPlaying && <CameraIdle />}
      {isPlaying && <PointerLockControls ref={ref} onUnlock={onUnlock} />}
    </>
  );
}

export default Scene;
