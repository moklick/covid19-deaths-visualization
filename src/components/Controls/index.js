import React, { useRef, useCallback, useEffect } from 'react';
import { MapControls, PointerLockControls } from '@react-three/drei';
import shallow from 'zustand/shallow';

import CameraIdle from 'components/CameraIdle';
import useStore from 'state';
import { hasTouch } from 'utils/browser-utils';

const selector = (s) => ({ isPlaying: s.isPlaying, setIsPlaying: s.setIsPlaying });

function Controls() {
  const pointerLockRef = useRef();
  const { isPlaying, setIsPlaying } = useStore(selector, shallow);
  const onUnlock = useCallback(() => setIsPlaying(false), []);

  useEffect(() => {
    if (pointerLockRef.current) {
      if (isPlaying) {
        pointerLockRef.current.lock();
      }
    }
  }, [isPlaying]);

  return (
    <>
      {!isPlaying && !hasTouch && <CameraIdle />}
      {!hasTouch && <PointerLockControls onUnlock={onUnlock} ref={pointerLockRef} />}
      {isPlaying && hasTouch && (
        <MapControls
          screenSpacePanning={false}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2}
        />
      )}
    </>
  );
}

export default Controls;
