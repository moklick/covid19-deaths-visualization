import React from 'react';
import { useTheme, Global, css } from '@emotion/react';

const GlobalStyle = () => {
  const theme = useTheme();

  const globalStyles = css`
    @font-face {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      src: local(''), url('/static/fonts/lato-v20-latin-regular.woff2') format('woff2'),
        url('/static/fonts/lato-v20-latin-regular.woff') format('woff');
    }

    @font-face {
      font-family: 'Merriweather';
      font-style: normal;
      font-weight: 400;
      src: local(''), url('/static/fonts/merriweather-v25-latin-regular.woff2') format('woff2'),
        url('/static/fonts/merriweather-v25-latin-regular.woff') format('woff');
    }

    html,
    body {
      font-family: 'Lato', sans-serif;
      font-weight: 400;
      letter-spacing: 0.5px;
      line-height: 1.5;
      font-size: 16px;
      padding: 0;
      margin: 0;
      color: ${theme.colors.text};
      height: 100%;
    }

    #root {
      height: 100%;
    }

    a {
      color: ${theme.colors.text};
      text-decoration: none;
    }
    a:visited,
    a:focus,
    a:active {
      color: ${theme.colors.text};
      text-decoration: none;
    }
    a:hover {
      color: ${theme.colors.text};
      text-decoration: none;
    }
    code,
    pre {
      font-family: ${theme.fonts.mono};
    }
  `;

  return <Global styles={globalStyles} />;
};

export default GlobalStyle;
