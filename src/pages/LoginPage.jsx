import { TextField } from "../components/TextField.jsx";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import aquariumLogo from "../assets/aquariumLogo.svg";
import { Link } from "react-router-dom";
import { Input } from "@material-tailwind/react";
export default function LoginPage() {
  return (
    <div className="h-screen bg-blue-gray-100 flex justify-center items-center ">
      <Card className="flex items-center flex-col  w-80  ">
        <div className="mt-4">
          <img src={aquariumLogo} alt="My aquariumLogo" />
        </div>
        <CardBody className="flex flex-col pt-0 ">
          <div className="flex items-center w-72 mb-4">
            <Input
              type="text"
              label="Почта"
              className="input input-bordered w-full max-w-xs pl-4  border border-[#475569] rounded  "
            />
          </div>
          <div className="flex items-center w-72 mb-4">
            <Input
              type="text"
              label="Пароль"
              className="input input-bordered w-full max-w-xs pl-4  border border-[#475569] rounded  "
            />
          </div>
          <div className="-ml-2.5 ">
            <Checkbox color="blue" label="Запомнить меня" />
          </div>
        </CardBody>
        <CardFooter className="pt-0 w-80">
          <Button fullWidth color="blue">
            Войти
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Нет аккаунта?
            <Link to="/signup">
              <Typography
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Зарегистрироваться
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
