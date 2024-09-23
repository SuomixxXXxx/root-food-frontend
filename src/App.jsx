import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import ProductCard from "./components/ProductCard";
import RegistrationPage from "./pages/RegistrationPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header/>
      <ProductCard name ="Сосиска в тесте" weight = {10} price = {100} />
      {/*<LoginPage/>*/}
      {/* <RegistrationPage/> */}
      {/* <CartPage/> */}
    </>

  );
}

export default App;
