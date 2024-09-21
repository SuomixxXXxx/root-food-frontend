import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import RegistrationPage from "./pages/RegistrationPage";
import CartPage from "./pages/CartPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header/>
      <RegistrationPage/>
      {/* <CartPage/> */}
    </>

  );
}

export default App;
