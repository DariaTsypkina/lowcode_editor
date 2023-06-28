import React from "react";

import { App } from "./App.js";
import { GlobalStyle } from "./styles/global.js";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
