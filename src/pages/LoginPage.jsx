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
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchAtuh } from "../redux/slices/auth.js";
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "11",
      password: "11",
    },
    mode: 'all'
  });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(fetchAtuh(data))
    console.log(data);
  };
  console.log(errors, isValid);
  
  return (
    <div className="h-screen bg-blue-gray-100 flex justify-center items-center ">
      <Card className="flex items-center flex-col  w-80  ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <img src={aquariumLogo} alt="My aquariumLogo" />
          </div>
          <CardBody className="flex flex-col pt-0 ">
            <div className="flex flex-col w-72 mb-4">
              <Input
                type="text"
                label="Почта"
                color="blue"
                error={Boolean(errors.login?.message)}
                {...register("login", { required: "Укажите почту" })}
                className="input input-bordered w-full max-w-xs pl-4  border border-[#475569] rounded  "
              />
              <Typography type="small" color="red" className="mt-1 block">
                {errors.login?.message}
              </Typography>
            </div>
            <div className="flex  flex-col w-72 mb-4">
              <Input
                type="text"
                label="Пароль"
                color="blue"
                error={Boolean(errors.password?.message)}
                {...register("password", { required: "Укажите пароль" })}
                className="input input-bordered w-full max-w-xs pl-4  border border-[#475569] rounded  "
              />
              <Typography type="small" color="red" className="mt-1 block">
                {errors.password?.message}
              </Typography>
            </div>
            <div className="-ml-2.5 ">
              <Checkbox color="blue" label="Запомнить меня" />
            </div>
          </CardBody>
          <CardFooter className="pt-0 w-80">
            <Button type="submit" fullWidth color="blue">
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
        </form>
      </Card>
    </div>
  );
}
