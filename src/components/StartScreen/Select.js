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

const colorAndBg = (state) => {
  let backgroundColor = '#fff';
  let color = '#111';

  if (state.isFocused) {
    backgroundColor = '#333';
    color = '#fff';
  } else if (state.isSelected) {
    backgroundColor = '#222';
    color = '#fff';
  }

  return {
    backgroundColor,
    color,
  };
};

const styles = {
  control: (base) => ({
    ...base,
    borderColor: '#ddd',
    boxShadow: 'none',
    '&:active': borderStyle,
    '&:hover': borderStyle,
    '&:focus': borderStyle,
  }),
  option: (base, state) => ({
    ...base,
    ...colorAndBg(state),
    '&:hover': {
      background: '#333',
    },
    span: {
      color: '#ababab',
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

function formatOptionLabel({ label, deaths }) {
  return (
    <>
      {label} <span>({deaths.toLocaleString()} deaths)</span>
    </>
  );
}

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
        formatOptionLabel={formatOptionLabel}
      />
      {isInitialUse && <Info>current country: {getCountryByIso(country).label}</Info>}
    </>
  );
}

export default Select;
