import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import ReactSelect from 'react-select';
import shallow from 'zustand/shallow';

import useStore from 'state';

import countries from '../../../static/data/countries.json';

const borderStyle = {
  borderColor: '#eee',
  boxShadow: 'none',
};

const focusedBg = (state) => {
  if (state.isFocused) {
    return '#FEEBC8';
  }

  return state.isSelected ? '#fbd38d' : 'white';
};

const styles = {
  control: (base) => ({
    ...base,
    borderColor: '#eee',
    boxShadow: 'none',
    '&:active': borderStyle,
    '&:hover': borderStyle,
    '&:focus': borderStyle,
  }),
  option: (base, state) => ({
    ...base,
    background: focusedBg(state),
    '&:hover': {
      background: '#FEEBC8',
    },
  }),
};

const selector = (s) => ({ setCountry: s.setCountry, country: s.country });

const getCountryByIso = (iso) => countries.find((c) => c.value === iso);

const Info = styled.div`
  display: flex;
  color: #999;
  font-size: 12px;
`;

function Select() {
  const [isInitialUse, setInitialUse] = useState(true);
  const { country, setCountry } = useStore(selector, shallow);
  const onChange = useCallback((option) => {
    setInitialUse(false);
    setCountry(option.value);
  }, []);

  return (
    <>
      <ReactSelect
        options={countries}
        placeholder="Select a country..."
        onChange={onChange}
        styles={styles}
      />
      {isInitialUse && <Info>current country: {getCountryByIso(country).label}</Info>}
    </>
  );
}

export default Select;
