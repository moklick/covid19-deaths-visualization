import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@emotion/react';
import { Canvas } from '@react-three/fiber';

import NormalizeStyle from 'style/normalize';
import GlobalStyle from 'style/global';
import theme from 'style/theme';
import Scene from 'components/Scene';
import StartScreen from 'components/StartScreen';
import { hasTouch } from 'utils/browser-utils';

const cameraPosition = hasTouch ? [0, 5, 10] : undefined;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NormalizeStyle />
      <GlobalStyle />
      <StartScreen />
      <Canvas shadows gl={{ alpha: true }} camera={{ position: cameraPosition, far: 100 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
