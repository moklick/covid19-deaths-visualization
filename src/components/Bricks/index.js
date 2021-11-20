import React, { useEffect, useRef, useState } from 'react';
import { Object3D } from 'three';
import shallow from 'zustand/shallow';
// import { useTexture } from '@react-three/drei';

import useStore from 'state';

import { createGridData } from './utils';
import Labels from './Labels';

const tempObject = new Object3D();
const tempObject2 = new Object3D();

const selector = (s) => ({ country: s.country, setSize: s.setSize });

function Bricks() {
  const ref = useRef();
  // const ref2 = useRef();
  const { country, setSize } = useStore(selector, shallow);
  const [grid, setGrid] = useState({});

  // const texture = useTexture('static/shadowblob.png');

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`static/data/${country}.json`);
      const json = await res.json();
      const data = createGridData(json);

      const size = data.reduce((acc, gd) => {
        acc += gd.positions.length;
        return acc;
      }, 0);

      setSize(size);
      setGrid({ data, size });
    };

    loadData();
  }, [country]);

  useEffect(() => {
    if (grid.data) {
      let id = 0;

      grid.data.forEach((g) => {
        g.positions.forEach(([x, y, z]) => {
          tempObject.position.set(x, y, z);
          tempObject.updateMatrix();
          ref.current.setMatrixAt(id, tempObject.matrix);

          // tempObject2.position.set(x, 0.001, z);
          // tempObject2.rotation.x = -Math.PI / 2;
          // tempObject2.updateMatrix();
          // ref2.current.setMatrixAt(id, tempObject2.matrix);

          id += 1;
        });
      });

      ref.current.instanceMatrix.needsUpdate = true;
      // ref2.current.instanceMatrix.needsUpdate = true;
    }
  }, [grid.data]);

  return (
    <>
      <instancedMesh ref={ref} args={[null, null, grid.size]} castShadow>
        <boxBufferGeometry args={[0.5, 0.8, 0.2]} />
        <meshLambertMaterial color="white" />
      </instancedMesh>
      {/* <instancedMesh ref={ref2} args={[null, null, grid.size]}>
        <planeBufferGeometry args={[0.95, 0.95, 1, 1]} />
        <meshBasicMaterial map={texture} transparent opacity={0} />
      </instancedMesh> */}
      <Labels data={grid.data} />
    </>
  );
}

export default Bricks;
