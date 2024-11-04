import "./App.css";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import SignupPage from "./pages/SignupPage";
import CategoryPage from "./pages/CategoryPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardOrderPage from "./pages/DashboardOrderPage";
import DashboardProductPage from "./pages/DashboardProductPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishItems } from "./redux/slices/dishItem.js";
import { checkAuth } from "./redux/slices/auth.js";
import { fetchCategories } from "./redux/slices/categories.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={['user', null]} redirectPath="/dashboard">
        <LandingPage />
      </ProtectedRoute>
    ),
    children: [

      { path: "", element: <LandingPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "category", element: <CategoryPage /> },
      { path: "category/:id", element: <ProductPage /> },
      { path: "search", element: <ResultPage /> },
      { path: "*", element: <div>404</div> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={['admin', 'staff']} redirectPath="/">
        <DashboardPage />
      </ProtectedRoute>
    ),
    children: [

      { path: "/dashboard", element: <DashboardOrderPage /> },
      { path: "category/:id", element: <DashboardProductPage /> },
      { path: "orders", element: <DashboardOrderPage /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
    dispatch(fetchDishItems());
    dispatch(fetchCategories());
  }, [dispatch]);
      console.log("token");

    }
  }, [dispatch]);
  // console.log(dishes);
  return <RouterProvider router={router} />;
}

export default App;
