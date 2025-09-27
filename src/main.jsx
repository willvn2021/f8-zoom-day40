import { StrictMode } from "react";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
// import { Provider as ReduxProvider } from "react-redux";
import { Provider as ReduxProvider } from "./contexts/ReduxContext";
import "./index.css";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>
);
