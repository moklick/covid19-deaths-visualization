import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import shallow from 'zustand/shallow';

import useStore from 'state';
import { device } from 'utils/css-utils';
import { hasTouch } from 'utils/browser-utils';
import Select from './Select';

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.75);
  display: flex;
  justify-content: center;
  z-index: 10;

  @media ${device.tablet} {
    background-color: rgba(255, 255, 255, 0.85);
  }
`;

const Modal = styled.div`
  max-width: 600px;
  width: 90%;
  padding-top: 0;

  @media ${device.tablet} {
    padding-top: 10vh;
  }

  h1 {
    font-weight: 900;
    line-height: 1.2;
    font-size: 2.2rem;
  }

  p span {
    font-family: monospace;
    background: #f5f5f5;
    border-radius: 2px;
    border-width: 1px 1px 3px;
    font-size: 14px;
    padding-inline: 0.4em;
    white-space: nowrap;
    border-color: #e0e0e0;
    border-style: solid;
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
  background: #111;
  letter-spacing: 1px;
  color: #f8f8f8;

  &:hover {
    transform: scale(1.025);
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

const Close = styled.div`
  position: absolute;
  background: white;
  box-shadow: 0px 1px 6px 2px rgba(0, 0, 0, 0.1);
  right: 10px;
  bottom: 15px;
  z-index: 10;
  border-radius: 50%;
  font-size: 24px;
  opacity: 0.75;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
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

  const onClose = useCallback(() => setIsPlaying(false), []);

  if (isPlaying) {
    return hasTouch ? <Close onClick={onClose}>×</Close> : null;
  }

  return (
    <Background onMouseMove={onMouseMove}>
      <Modal>
        <h1>Coronavirus Cemetery</h1>
        <p>
          This visualization shows confirmed Covid-19 deaths since the beginning of the pandemic.
          Each block represents a person that died with a Covid-19 infection. The blocks are grouped
          by months. There are 100 blocks in a row.
        </p>
        {hasTouch ? (
          <p>
            You can walk around by dragging the screen with one finger and you can rotate, pinch and
            zoom the view with two fingers.
          </p>
        ) : (
          <p>
            You can walk around by using the keys <span>W</span>,<span>A</span>,<span>S</span> and{' '}
            <span>D</span> or arrow keys and look around by moving the mouse. Press <span>ESC</span>{' '}
            to come back to this start screen.
          </p>
        )}
        <Select />
        <ButtonWrapper>
          <Button onClick={() => setIsPlaying(true)}>Start</Button>
        </ButtonWrapper>

        <Byline>
          Data Source: <a href="https://ourworldindata.org/covid-deaths">Our World in Data</a>
        </Byline>
        <Byline>
          by <a href="https://twitter.com/moklick">Moritz Klack</a> – Code on{' '}
          <a href="https://github.com/moklick/covid19-deaths-visualization">Github</a>
        </Byline>
      </Modal>
    </Background>
  );
}

export default StartScreen;
