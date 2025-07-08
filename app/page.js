import Image from "next/image";

import "./globals.css";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <Component {...pageProps} />
  </div>
);

export default MyApp;
