import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { createTheme } from "@mui/material/styles";
// import { ThemeProvider } from "@mui/material";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

import store from "./app/store";

// create custom theme
// const myTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#fff",
//       contrastText: "#000",
//     },
//   },
// });

const persistor = persistStore(store);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          {/* <ThemeProvider theme={myTheme}> */}
          <App />
          {/* </ThemeProvider> */}
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
