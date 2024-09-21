import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import RegistrationPage from "./pages/RegistrationPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header/>
      <LoginPage/>
      {/* <RegistrationPage/> */}
      {/* <CartPage/> */}
    </>

  );
}

export default App;
