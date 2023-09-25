import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import LoaderProvider from "./context/LoaderContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <LoaderProvider>
         <Router>
            <App />
         </Router>
      </LoaderProvider>
   </Provider>
);
