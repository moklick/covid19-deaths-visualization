import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@emotion/react';
import { Canvas } from '@react-three/fiber';

import NormalizeStyle from 'style/normalize';
import GlobalStyle from 'style/global';
import theme from 'style/theme';
import Scene from 'components/Scene';
import StartScreen from 'components/StartScreen';

const AppWrapper = () => {
  const onCreated = (state) => {
    state.gl.shadowMap.needsUpdate = true;
    state.gl.shadowMap.autoUpdate = false;

    console.log(state);

    state.camera.lookAt(0, -2, 0);

    window.state = state;
  };

  return (
    <ThemeProvider theme={theme}>
      <NormalizeStyle />
      <GlobalStyle />
      <StartScreen />
      <Canvas shadows gl={{ alpha: true }} camera={{ far: 100 }} onCreated={onCreated}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </ThemeProvider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
