// player controls taken from https://codesandbox.io/s/minecraft-vkgi6
// via: https://docs.pmnd.rs/react-three-fiber/getting-started/examples

import React, { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import shallow from 'zustand/shallow';

import useStore from 'state';
import { hasTouch } from 'utils/browser-utils';

const SPEED = 5;
const keys = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  ArrowUp: 'forward',
  ArrowDown: 'backward',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Space: 'jump',
  ShiftLeft: 'run',
};
const moveFieldByKey = (key) => keys[key];
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();
const speed = new Vector3();

const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    run: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
    const handleKeyUp = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};

const selector = (s) => ({ isPlaying: s.isPlaying, country: s.country });

function Player() {
  const { isPlaying, country } = useStore(selector, shallow);
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 5, 5],
  }));
  const { forward, backward, left, right, jump, run } = usePlayerControls();
  const { camera } = useThree();
  const velocity = useRef([0, 0, 0]);

  useEffect(
    () =>
      api.velocity.subscribe((v) => {
        velocity.current = v;
      }),
    []
  );

  useEffect(() => {
    api.position.set(0, 5, 5);
    camera.lookAt(0, hasTouch ? 0 : -2, hasTouch ? -5 : 0);
  }, [country]);

  useFrame(() => {
    ref.current.getWorldPosition(camera.position);

    if (isPlaying) {
      frontVector.set(0, 0, Number(backward) - Number(forward));
      sideVector.set(Number(left) - Number(right), 0, 0);

      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED * (run ? 10 : 1))
        .applyEuler(camera.rotation);

      speed.fromArray(velocity.current);
      api.velocity.set(direction.x, velocity.current[1], direction.z);

      if (isPlaying && jump && Math.abs(velocity.current[1]) < 0.05) {
        api.velocity.set(velocity.current[0], 10, velocity.current[2]);
      }
    }
  });

  return <mesh ref={ref} />;
}

export default Player;
