
import React from "react";
import {
    Card,
  } from "@material-tailwind/react";
 
  
  export default function CardCategory({ name, image }) {
    return (
      <Card className="w-72 h-52 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative">
        <div className="relative h-full w-full">
          <img
            src={image} 
            alt={name}
            className="object-cover h-full w-full"
          />
    
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <h5 className="text-white text-2xl font-bold text-center">{name}</h5>
          </div>
        </div>
      </Card>
    );
  }
  