import { TextField } from "../components/TextField.jsx";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import aquariumLogo from "../assets/aquariumLogo.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signup, selectIsAuth } from "../redux/slices/auth.js";
import { Navigate } from "react-router-dom";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "100",
      surname: "100",
      login: "100",
      password: "100",
    },
    mode: "all",
  });
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onSubmit = async (data) => {
    const response = await dispatch(signup(data));

    if (!response.payload) return alert("Не удалось зарегистрироваться");

    if ("token" in response.payload.data) {
      localStorage.setItem("token", response.payload.data.token);
      localStorage.setItem("refreshToken", response.payload.data.refreshToken);
    }
    console.log(response);
  };

  console.log(isAuth + " is authenticated");

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen bg-blue-gray-100 flex justify-center items-center ">
      <Card className="flex items-center flex-col w-80 mt-32 mb-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <img src={aquariumLogo} alt="My aquariumLogo" />
          </div>
          <CardBody className="flex flex-col pt-0">
            <div className="flex flex-col w-72 mb-4">
              <Input
                type="text"
                label="Имя"
                color="blue"
                error={Boolean(errors.name?.message)}
                {...register("name", { required: "Укажите имя" })}
                className="input input-bordered w-full max-w-xs pl-4  border border-[#475569] rounded  "
              />
              <Typography type="small" color="red" className="mt-1 block">
                {errors.name?.message}
              </Typography>
            </div>
            <div className="flex flex-col w-72 mb-4">
              <Input
                type="text"
                label="Фамилия"
                color="blue"
                error={Boolean(errors.surname?.message)}
                {...register("surname", { required: "Укажите фамилию" })}
                className="input input-bordered w-full max-w-xs pl-4  border border-[#475569] rounded  "
              />
              <Typography type="small" color="red" className="mt-1 block">
                {errors.surname?.message}
              </Typography>
            </div>
            <div className="flex flex-col w-72 mb-4">
              <Input
                type="text"
                label="Логин"
                color="blue"
                error={Boolean(errors.login?.message)}
                {...register("login", { required: "Укажите логин" })}
                className="input input-bordered w-full max-w-xs pl-4  border border-[#475569] rounded  "
              />
              <Typography type="small" color="red" className="mt-1 block">
                {errors.login?.message}
              </Typography>
            </div>
            <div className="flex flex-col w-72 mb-4">
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
          </CardBody>
          <CardFooter className="pt-0 w-80">
            <Button disabled={!isValid} type="submit" fullWidth color="blue">
              Зарегистрироваться
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Есть аккаунт?
              <Link to="/login">
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
        </form>
      </Card>
    </div>
  );
}
