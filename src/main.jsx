import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // ทำการเปลี่ยนเป็น BrowserRouter
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />{" "}
        </LocalizationProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
