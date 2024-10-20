import React, { useState } from "react";
import DashboardProductCard from "../components/DashboardProductCard"; 
import { Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";

export default function DashboardProductPage() {
  const { id } = useParams(); // Получаем id категории из URL
  const [isHasRight, setIsHasRight] = useState(true);

  // Массив продуктов
  const products = [
    { id: 1, name: "Макароны", weight: 500, price: 300, categoryId: 1 },
    { id: 2, name: "Сосиска в тесте", weight: 700, price: 500, categoryId: 2 },
    { id: 3, name: "Борщ", weight: 1000, price: 700, categoryId: 3 },
    { id: 4, name: "Пирог", weight: 800, price: 600, categoryId: 4 },
    { id: 5, name: "Морс", weight: 400, price: 250, categoryId: 5 },
  ];
  const filteredProducts = products.filter(
    (product) => product.categoryId === parseInt(id)
  );

  return (
    <div className="p-4">
      {isHasRight && (
        <div className="flex justify-end mb-4">
          <Button color="yellow">Добавить блюдо</Button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <DashboardProductCard
              key={product.id}
              name={product.name}
              weight={product.weight}
              price={product.price}
              isAdmin={isHasRight} // Передаем isHasRight как isAdmin
            />
          ))
        ) : (
          <div>Нет продуктов в этой категории</div>
        )}
      </div>
    </div>
  );
}
