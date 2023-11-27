import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles.css";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "@/Store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraBaseProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraBaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
