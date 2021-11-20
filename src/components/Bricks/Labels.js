import React from 'react';
import { Text } from '@react-three/drei';

import { parseDate } from './utils';

function Labels({ data }) {
  if (!data) {
    return null;
  }

  return data?.map(({ date, deaths, positions }) => (
    <group key={date}>
      <Text
        position={[0, 0.01, positions[0][2] + 0.6]}
        rotation-x={-Math.PI / 2}
        textAlign="center"
        lineHeight={1}
        letterSpacing={0.25}
        fontSize={0.15}
        color="#f6f6f6"
      >
        {parseDate(date)}
      </Text>
      <Text
        position={[0, 0.01, positions[0][2] + 0.8]}
        rotation-x={-Math.PI / 2}
        textAlign="center"
        lineHeight={1}
        letterSpacing={-0.05}
        fontSize={0.25}
        color="#efefef"
      >
        {deaths} deaths
      </Text>
    </group>
  ));
}

export default Labels;
