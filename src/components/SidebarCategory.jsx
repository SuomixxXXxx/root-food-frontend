import React from "react";
import { Card, Typography, List, ListItem } from "@material-tailwind/react";
import firstDish from "../assets/images/FirstDish.png";
import secondtDish from "../assets/images/SecondDish.png";
import drink from "../assets/images/Napitok.png";
import bake from "../assets/images/Vipichka.png";
import dessert from "../assets/images/Desert.png";
import salat from "../assets/images/Salat.png";

const categories = [
  {
    label: "Первое блюдо",
    img: firstDish,
  },
  {
    label: "Второе блюдо",
    img: secondtDish,
  },
  {
    label: "Напитки",
    img: drink,
  },
  {
    label: "Выпечка",
    img: bake,
  },
  {
    label: "Десерты",
    img: dessert,
  },
  {
    label: "Салаты",
    img: salat,
  },
];

export function SidebarCategory() {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-6 shadow-xl shadow-blue-gray-900/5 rounded-xl bg-white">
      <div className="mb-6">
        <Typography
          variant="h5"
          color="blue-gray"
          className="font-bold text-xl"
        >
          Категории товаров
        </Typography>
      </div>
      <List className="space-y-4">
        {categories.map((item, index) => (
          <ListItem
            key={index}
            className="flex items-center hover:bg-blue-100 transition-all duration-200 rounded-lg p-2 cursor-pointer"
          >
            {item.img && (
              <img
                src={item.img}
                alt={item.label}
                className="h-10 w-10 md:h-12 md:w-12 mr-4 rounded-full shadow-md"
              />
            )}
            <Typography className="text-base font-medium text-blue-gray-700">
              {item.label}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
