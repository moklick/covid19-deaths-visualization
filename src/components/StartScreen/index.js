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
    line-height: 1.2;
    font-size: 2.2rem;
    font-family: Merriweather, serif;
    font-weight: 400;
  }
`;

const Kbd = styled.span`
  font-family: monospace;
  background: #f5f5f5;
  border-radius: 2px;
  border-width: 1px 1px 3px;
  font-size: 14px;
  padding-inline: 0.4em;
  white-space: nowrap;
  border-color: #e0e0e0;
  border-style: solid;
`;

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

const ControlsInfo = styled.div`
  position: absolute;
  z-index: 10;
  left: 10px;
  bottom: 10px;
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
    return hasTouch ? (
      <Close onClick={onClose}>??</Close>
    ) : (
      <ControlsInfo>
        Walk: Arrow keys or <Kbd>W</Kbd>,<Kbd>A</Kbd>,<Kbd>S</Kbd> and <Kbd>D</Kbd>. Leave:{' '}
        <Kbd>ESC</Kbd>
      </ControlsInfo>
    );
  }

  return (
    <Background onMouseMove={onMouseMove}>
      <Modal>
        <h1>Coronavirus Cemetery</h1>
        <p>
          More than 100k people have died of COVID-19 in the country where I live (Germany). If not
          enough people get vaccinated another 100k+ people will die. To get a better sense of these
          numbers I created this walkable visualization.
        </p>

        <p>
          The visualization shows confirmed COVID-19 deaths since the beginning of the pandemic.
          Each block represents a person who has died with a COVID-19 infection. The blocks are
          grouped by months. There are 100 blocks in a row.
        </p>
        {hasTouch ? (
          <p>
            You can walk around by dragging the screen with one finger and you can rotate, pinch and
            zoom the view with two fingers.
          </p>
        ) : (
          <p>
            You can walk around by using arrow keys or <Kbd>W</Kbd>,<Kbd>A</Kbd>,<Kbd>S</Kbd> and{' '}
            <Kbd>D</Kbd> and look around by moving the mouse. Press <Kbd>ESC</Kbd> to go back to
            this start screen.
          </p>
        )}
        <Select />

        <Button onClick={() => setIsPlaying(true)}>Start</Button>

        <Byline>
          Data Source: <a href="https://ourworldindata.org/covid-deaths">Our World in Data</a>
        </Byline>
        <Byline>
          by <a href="https://twitter.com/moklick">Moritz Klack</a> ??? Code on{' '}
          <a href="https://github.com/moklick/covid19-deaths-visualization">Github</a>
        </Byline>
      </Modal>
    </Background>
  );
}

export default StartScreen;
