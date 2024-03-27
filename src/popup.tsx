import React from "react";
import { createRoot } from "react-dom/client";
import Popup from "./components/Popup/Popup";

import "./styles/reset.css";
import "./styles/global.css";
import "./styles/font.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
