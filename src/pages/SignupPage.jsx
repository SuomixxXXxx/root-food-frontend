import { TextField } from "../components/TextField.jsx";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import aquariumLogo from "../assets/aquariumLogo.svg";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="h-screen bg-blue-gray-100 flex justify-center items-center ">
      <Card className="flex items-center flex-col  w-80  ">
        <div className="mt-4">
          <img src={aquariumLogo} alt="My aquariumLogo" />
        </div>
        <CardBody className="flex flex-col pt-0">
          <TextField placeholder={"Имя"} />
          <TextField placeholder={"Номер телефона"} />
          <TextField placeholder={"Почта"} />
          <TextField placeholder={"Пароль"} />
        </CardBody>

        <CardFooter className="pt-0 w-80">
          <Button fullWidth color="blue">
            Зарегистрироваться
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Есть аккаунт?
            <Link to='/login'>
              <Typography
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Войти
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
