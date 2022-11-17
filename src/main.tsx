import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { LocalDatabaseProvider } from "./contexts/Database";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalDatabaseProvider>
      <App />
    </LocalDatabaseProvider>
  </React.StrictMode>
);
