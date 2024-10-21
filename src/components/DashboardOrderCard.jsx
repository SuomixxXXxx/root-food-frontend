import {Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import React from "react"


export default function DashboarOrderCard({ orderNumber, items }) {
    return (
      <Card className="flex flex-col w-80 h-80" >
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-2 text-base md:text-xl">
            Заказ №{orderNumber}
          </Typography>
          <ul className="text-left h-40 overflow-y-auto">
            {items && items.map((item, index) => (
                <li key={index} className="flex justify-between text-sm border-b-2  mb-2 md:text-base">
                <span>{item.name}</span>
                <span className="mr-5">{item.count}</span>
                </li>
            ))}
          </ul>
        </CardBody>
        <CardFooter className="max-w">
          <Button  fullWidth color="blue">
            Готово
          </Button>
        </CardFooter>
      </Card>
    );
  }
