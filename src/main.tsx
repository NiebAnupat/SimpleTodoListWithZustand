import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MantineProvider, Global } from "@mantine/core";

function MyGlobalStyles() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Noto Sans Thai",
            src: `url("https://cdn.jsdelivr.net/gh/lazywasabi/thai-web-fonts@7/fonts/NotoSansThai/NotoSansThai-Regular.woff2") format("woff2")`,
            fontStyle: "normal",
            fontWeight: "normal",
            fontDisplay: "swap",
          },
        },
      ]}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{ colorScheme: "dark", fontFamily: "Noto Sans Thai" }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MantineProvider>
);
