// This default export is required in a new `pages/_app.js` file.
import React from 'react'
import App, { Container } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;
import '../style.css'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp;