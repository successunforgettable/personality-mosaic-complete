import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AssessmentProvider } from "./context/AssessmentContext";

createRoot(document.getElementById("root")!).render(
  <AssessmentProvider>
    <App />
  </AssessmentProvider>
);
