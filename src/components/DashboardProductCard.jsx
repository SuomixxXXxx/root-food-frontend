import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import Modal from "./Modal"; 

export default function DashboardProductCard({ name, weight, price, isAdmin }) {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card className="flex flex-col h-auto w-60 md:w-80 bg-white shadow-lg p-4">
        <CardHeader
          floated={false}
          className="flex justify-center items-center h-56 mb-4"
        >
          <div className="flex justify-center items-center h-full w-full overflow-hidden">
            <img
              src="https://vavilongu.ru/storage/photo/resized/xy_1732x1732/e/fzeilpu3dhzj9zg_e6a5db71.jpg"
              alt="product"
              className="object-contain h-full w-full"
            />
          </div>
        </CardHeader>
        <CardBody className="text-center">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-lg md:text-xl"
          >
            {name}
          </Typography>
          <Typography
            color="blue-gray"
            className="font-medium text-left mb-2 text-sm md:text-base"
          >
            Вес: {weight} г
          </Typography>
          <Typography
            color="blue-gray"
            className="font-medium text-left text-sm md:text-base mb-4"
          >
            Цена: {price} ₽
          </Typography>
          <div className="w-full flex flex-col items-center space-y-2">
            {isAdmin ? (
              <div className="flex flex-col items-center space-y-2">
                <Button
                  color="green"
                  size="sm"
                  className="w-full"
                  onClick={handleOpenModal}
                >
                  Изменить товар
                </Button>
                <Button color="red" size="sm" className="w-full">
                  Удалить товар
                </Button>
              </div>
            ) : (
              <Button
              color="green"
              size="sm"
              className="w-full"
              onClick={handleOpenModal}
            >
              Изменить товар
            </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <Modal open={open} onClose={handleCloseModal}>
        <Typography variant="h5" color="black" className="mb-4">
          Изменение карточки товара
        </Typography>
        <div className="flex justify-center items-center h-56 mb-4">
          <img
            src="https://vavilongu.ru/storage/photo/resized/xy_1732x1732/e/fzeilpu3dhzj9zg_e6a5db71.jpg"
            alt="product"
            className="object-contain h-full w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Typography>Название: {name}</Typography>
          <Typography>Вес: {weight} г</Typography>
          <Typography>Цена: {price} ₽</Typography>
        </div>
        <div className="flex justify-between mt-6">
          <Button color="green">Сохранить</Button>
          <Button onClick={handleCloseModal} color="blue">
            Закрыть
          </Button>
        </div>
      </Modal>
    </div>
  );
}

