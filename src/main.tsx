import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Styles
import "./styles/index.css";
import "./styles/App.css";

// Render App
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
