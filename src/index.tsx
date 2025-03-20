import "@fontsource-variable/lora";
import "@fontsource-variable/open-sans";
import "@fontsource/space-mono";
import "@fontsource/inter";
import "@fontsource/poppins";
import "@fontsource/karla";
import "@fontsource-variable/domine";
import '@fontsource-variable/hanken-grotesk';
import { HELVETICA_STYLE } from "@/store/constants";


import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import ChakraWrapper from "@/components/wrappers/ChakraWrapper/ChakraWrapper";
import { Provider as RematchProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/store/store";
import { Global } from "@emotion/react";
import ScrollWrapper from "@/components/wrappers/ScrollWrapper/ScrollWrapper";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    <Global styles={HELVETICA_STYLE} />
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <RematchProvider store={store}>
          <ChakraWrapper>
            <ScrollWrapper />
            <App />
          </ChakraWrapper>
        </RematchProvider>
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </>
);
