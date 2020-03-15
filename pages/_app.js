/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/styles.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
