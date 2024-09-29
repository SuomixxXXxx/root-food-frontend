import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import ProductCard from "./components/ProductCard";
import RegistrationPage from "./pages/RegistrationPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
    children: [
      { path: "signup", element: <RegistrationPage/> },
      { path: "cart", element: <CartPage/> },
      { path: "login", element: <LoginPage/> },
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>

  );
}

export default App;
