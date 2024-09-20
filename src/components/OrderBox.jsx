import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  CardHeader,
  IconButton,
} from "@material-tailwind/react";
export default function OrderBox() {
  return (
    <div>
      <Card className="w-[34rem]">
        <CardBody className="pb-2">
          <Typography variant="h5" color="black" className="mb-2">
            Ваш заказ
          </Typography>
          <div className="flex flex-row justify-between flex-wrap items-center mb-4">
            <div className="flex flex-row flex-wrap max-w-full mr-0">
              <Typography color="black">Борщик супер</Typography>
            </div>
            <div className="flex">
              <div className="flex flex-row gap-1 items-center mr-3">
                <IconButton color="blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                </IconButton>
                <div className="flex justify-center w-10">
                    <Typography color="black">11</Typography>
                </div>
                <IconButton color="blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </IconButton>
              </div>
              <div className="flex flex-row justify-center items-center w-20">
                <Typography color="black">311 ₽</Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between flex-wrap items-center mb-4">
            <div className="flex flex-row flex-wrap max-w-full mr-0">
              <Typography color="black">
                Бублик
              </Typography>
            </div>
            <div className="flex">
              <div className="flex flex-row gap-1 items-center mr-3">
                <IconButton color="blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                </IconButton>
                <div className="flex justify-center w-10">
                    <Typography color="black">100</Typography>
                </div>
                <IconButton color="blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </IconButton>
              </div>
              <div className="flex flex-row justify-center items-center w-20">
                <Typography color="black">31112 ₽</Typography>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
