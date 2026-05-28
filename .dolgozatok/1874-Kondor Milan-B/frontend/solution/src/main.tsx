import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Main from "./pages/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header.tsx";
import Cart from "./pages/Cart.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/heroes" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>,
);
