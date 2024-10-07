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
import CategoryPage from "./pages/CategoryPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
    children: [
      { path: "signup", element: <SignupPage/> },
      { path: "cart", element: <CartPage/> },
      { path: "login", element: <LoginPage/> },
      { path: "category", element: <CategoryPage/> },
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
