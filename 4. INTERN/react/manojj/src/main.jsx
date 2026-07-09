import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CounterProvider } from "./context/CounterContext.jsx";
import { Context2, ContextProvider } from "./context/Context2.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <CounterProvider>
      <App />
    </CounterProvider>
    
  </ContextProvider>,
);
