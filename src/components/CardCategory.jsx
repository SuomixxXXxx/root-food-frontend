import React from "react";
import { Card } from "@material-tailwind/react";

export default function CardCategory({ name, image }) {
  return (
    <Card className="w-full h-32 md:w-72 md:h-52 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative">
      <div className="relative h-full w-full">
        <img
          src={image}
          alt={name}
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 md:bg-opacity-50 hover:opacity-100 transition-opacity duration-300 md:opacity-0">
          <h5 className="text-white text-base md:text-2xl font-bold text-center">{name}</h5>
        </div>
      </div>
    </Card>
  );
}
