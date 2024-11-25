import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="min-w-full min-h-fit bg-dark-gray-blue m-0">
      <div className="flex flex-col md:flex-row md:justify-between pr-3 pl-3">
        <div className="flex flex-col pt-3 pb-3 ">
          <Typography color="black" className="text-2xl">
            Компания
          </Typography>
          <Link to="/">
              <Typography color="black" className="text-base mt-1 hover:text-gray-600">
                О нас
              </Typography>
          </Link>
        </div>
        <div className="flex flex-col md:pt-3 md:pb-3 ">
          <Typography color="black" className="text-2xl">
            Помощь
          </Typography>
          <Link to="/">
            <Typography color="black" className="text-base mt-1 hover:text-gray-600">
              Написать в поддержку
            </Typography>
          </Link>
          <Link to="/">
            <Typography color="black" className="text-base mt-1 hover:text-gray-600">
              Часто задаваемые вопросы
            </Typography>
          </Link>
        </div>
        <div className="flex flex-col pt-3 pb-3 ">
          <Typography color="black" className="text-2xl">
            Разработчики
          </Typography>
          <Link to="/">
            <Typography
              color="black"
              className="text-base mt-1 hover:text-gray-600"
            >
              Наша команда
            </Typography>
          </Link>
        </div>
      </div>
      <div className="min-w-full min-h-fit bg-light-blue">
        <Typography
          type="small"
          color="black"
          className="text-left text-sm p-3 pb-24 md:pb-3"
        >
          &copy; 2024 Аквариум. Все права защищены.
        </Typography>
      </div>
    </div>
  );
}
