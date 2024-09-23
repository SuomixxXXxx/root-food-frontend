import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header/>
      <ProductCard name ="Сосиска в тесте" weight = {10} price = {100} />
    </>
  );
}

export default App;
