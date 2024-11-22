import App from "./App.jsx";
import "./index.css";
//  import{UserProvider} from "./context/UserContext"
import { CartProvider } from "./context/cartContext";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import {UserProvider} from './context/UserContext'
import { BrowserRouter } from "react-router-dom";
import LoadCart from "./components/LoadCart/LoadCart.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";

export const AutoRefreshingRouter = ({ children }) => {
  const [shouldRefresh, setShouldRefresh] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(
      () => setShouldRefresh(true), 
      1000 * 60 * 60 * 6 // 6 hours in milliseconds
    );
    return () => clearTimeout(id);
  }, []);

  return (
    <BrowserRouter forceRefresh={shouldRefresh}>
      {children}
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <UserProvider>

      <CartProvider>
<ErrorBoundary>
      
        <BrowserRouter forceRefresh={true}>
          <App />
        </BrowserRouter>
</ErrorBoundary>
      </CartProvider>
  </UserProvider>
  
  </React.StrictMode>
);
