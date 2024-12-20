import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import aquariumLogo from "../assets/aquariumLogo.svg";
import { Link } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login, selectIsAuth } from "../redux/slices/auth.js";
import { decodeJwt } from 'jose';
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "100",
      password: "100",
    },
    mode: "all",
  });

  const dispatch = useDispatch();
  let role = "";
  const isAuth = useSelector(selectIsAuth);
  const onSubmit = async (data) => {
    const response = await dispatch(login(data));

    if (!response.payload) return alert("Не удалось авторизоваться");

    if ("token" in response.payload.data) {
      localStorage.setItem("token", response.payload.data.token);
      localStorage.setItem("refreshToken", response.payload.data.refreshToken);
      const claims = decodeJwt(response.payload.data.token);

      if (claims.role[0].includes("user")) {
        role = "user";
      };
      if (claims.role[0].includes("admin")) {
        role = "admin";
      };
      if (claims.role[0].includes("staff")) {
        role = "staff";
      };
      localStorage.setItem("role", role);
      localStorage.getItem("role") == "admin" ? navigate("/dashboard/orders") : "";
      localStorage.getItem("role") == "staff" ? navigate("/dashboard/orders") : "";
    }

  };
  console.log(isAuth + " is authenticated");

  if (isAuth) {
    return <Navigate to="/" />;
  }
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
          </CardBody>
          <CardFooter className="pt-0 w-full">
            <Button disabled={!isValid} type="submit" fullWidth color="blue">
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
