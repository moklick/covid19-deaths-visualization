import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

import useStore from 'state';

function CameraIdle({ vec = new Vector3(0, 5, 10) }) {
  return useFrame((state) => {
    const { x, y } = useStore.getState().mousePos;
    const mouseX = window.innerWidth / 2 - x;
    const mouseY = window.innerHeight / 2 - y;

    state.camera.position.lerp(
      vec.set(mouseX / (window.innerWidth * 0.25), mouseY / (window.innerHeight * 0.5), 10),
      0.075
    );
    state.camera.updateProjectionMatrix();
  });
}

export default CameraIdle;
