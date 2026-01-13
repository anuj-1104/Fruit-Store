import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/Appcontext.jsx";
import ScrollLinked from "./component/Motion/Indicator.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ScrollLinked>
        <App />
      </ScrollLinked>
    </AuthProvider>
  </BrowserRouter>
);
