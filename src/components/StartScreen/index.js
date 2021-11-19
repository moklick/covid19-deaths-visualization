import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import shallow from 'zustand/shallow';

import useStore from 'state';
import Select from './Select';

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  z-index: 10;
`;

const Modal = styled.div`
  max-width: 600px;
  width: 90%;
  padding-top: 10vh;

  h1 {
    font-weight: 900;
  }
`;

const ButtonWrapper = styled.div``;

const Button = styled.button`
  background: white;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.08);
  padding: 10px 40px;
  border-radius: 3px;
  background: white;
  border: none;
  font-family: 'Lato', sans-serif;
  cursor: pointer;
  text-transform: uppercase;
  margin: 20px 0;
  background: #fbd38d;
  letter-spacing: 1px;

  &:hover {
    box-shadow: 0px 1px 6px 2px rgba(0, 0, 0, 0.1);
  }
`;

const Byline = styled.div`
  color: #999;
  font-size: 12px;

  a,
  a:visited,
  a:focus {
    color: #999;
  }

  a:hover {
    color: #555;
  }
`;

const selector = (s) => ({
  isPlaying: s.isPlaying,
  setIsPlaying: s.setIsPlaying,
  setMousePos: s.setMousePos,
});

function StartScreen() {
  const { isPlaying, setIsPlaying, setMousePos } = useStore(selector, shallow);

  const onMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  if (isPlaying) {
    return null;
  }

  return (
    <Background onMouseMove={onMouseMove}>
      <Modal>
        <h1>Coronavirus Deaths Worldwide</h1>
        <p>
          This visualizations shows confirmed Covid-19 deaths since the beginning of the pandemic.
          Each block represents a person that died with a Covid-19 infection. The blocks are grouped
          by months.
        </p>
        <p>
          You can walk around with the keys WASD or arrow keys and look around by moving the mouse.
          Press ESC to come back to this start screen.
        </p>
        <Select />
        <ButtonWrapper>
          <Button onClick={() => setIsPlaying(true)}>Start</Button>
        </ButtonWrapper>

        <Byline>
          Data Source: <a href="https://ourworldindata.org/covid-deaths">Our World in Data</a>
        </Byline>
        {/* <Byline>
          by <a href="https://twitter.com/moklick">Moritz Klack</a>
        </Byline> */}
      </Modal>
    </Background>
  );
}

export default StartScreen;
