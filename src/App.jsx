import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header/>
      <RegistrationPage/>
    </>

  );
}

export default App;
