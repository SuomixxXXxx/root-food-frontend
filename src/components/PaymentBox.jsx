import React from 'react'
import {
    Card,
    CardBody,
    Typography,
    Button
  } from "@material-tailwind/react";
export default function PaymentBox() {
  return (
    <div>
      <Card className="w-80 md:w-96 h-60">
        <CardBody className="pb-2">
          <Typography variant="h5" color="black" className="mb-2">
            Способ оплаты
          </Typography>
          <div className="flex flex-row">
          <Typography color="black">Бебрабанк</Typography>
          </div>
          <Typography variant="h5" color="black" className="mb-2">
            Цена: 123 ₽
          </Typography>
          <div className='flex justify-center items-center h-full'><Button color="blue">Оплатить</Button></div>
        </CardBody>
      </Card>
    </div>
  )
}
