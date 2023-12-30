import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles.css";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "@/Store";
import "@fontsource/space-grotesk"; // Defaults to weight 400.
import "@fontsource/inter";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    space: `"space-grotesk", sans-serif`,
    inter: `"inter", sans-serif`
  },
});

export default theme;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraBaseProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraBaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
