import "./App.css";
import ProductCard from "./components/ProductCard";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import { useEffect } from "react";
import axios from './axios.js';
import { useDispatch } from'react-redux';
import { fetchDishItems } from "./redux/slices/dishItem.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
    children: [
      { path: "signup", element: <SignupPage/> },
      { path: "cart", element: <CartPage/> },
      { path: "login", element: <LoginPage/> },
    ]
  }
])

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDishItems())
  }, []);

  return (
    <>
      <RouterProvider router={router}/>
    </>

  );
}

export default App;
