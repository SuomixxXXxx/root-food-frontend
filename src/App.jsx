import "./App.css";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from'react-redux';
import { fetchDishItems } from "./redux/slices/dishItem.js";
import { checkAuth } from "./redux/slices/auth.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
    children: [
      { path: "signup", element: <SignupPage/> },
      { path: "cart", element: <CartPage/> },
      { path: "login", element: <LoginPage/> },
      { path: "*", element: <div>404</div> },
    ]
  }
])

function App() {
  
  const dispatch = useDispatch();

  const dishes = useSelector((state) => state.dishItems);

  const isDishesLoading = dishes.status === "loading";

  useEffect(() => {
    dispatch(fetchDishItems())

    if (localStorage.getItem('token')){
      dispatch(checkAuth())
    }

  }, []);
  console.log(dishes);
  
  return (
    <>
      <RouterProvider router={router}/>
    </>

  );
}

export default App;
