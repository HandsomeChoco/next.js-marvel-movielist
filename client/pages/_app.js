// This default export is required in a new `pages/_app.js` file.
import '../../style.css'
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;