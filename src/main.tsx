import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PDFMergerApp from "./PDFMergerApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PDFMergerApp />
  </StrictMode>,
);
