import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import React from "react";

export default function DashboardOrderCard({ orderNumber, items }) {
  return (
    <Card className="flex flex-col w-80 h-80 shadow-md rounded-lg p-4">
      <CardBody className="flex flex-col justify-between h-full">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-base md:text-xl">
          Заказ № {orderNumber}
        </Typography>
        
        <ul className="text-left h-40 overflow-y-auto">
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <li key={index} className="flex justify-between text-sm border-b-2 py-1 md:text-base">
                <span>{item.name}</span>
                <span className="mr-5">{item.count} </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">Нет товаров в заказе</li>
          )}
        </ul>
      </CardBody>
      <CardFooter className="pt-4">
        <Button fullWidth color="blue" size="sm">
          Готово
        </Button>
      </CardFooter>
    </Card>
  );
}
