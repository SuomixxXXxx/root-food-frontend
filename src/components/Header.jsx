import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth.js";
import { logout } from "../redux/slices/auth.js";
const styleNav = {
    position: "fixed",
    top: 0, 
    width: "100%", 
    zIndex: 20, 
    };
export default function Header() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
    }
  };
  
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar
      variant="gradient"
      color="white!important"
      className="max-w-full rounded-none border-b-1 "
      style={styleNav}
    >
      <div className="flex flex-row justify-between flex-wrap items-center">
        <div className="flex gap-5 h-max">
          <Typography className="lg:mr-4 cursor-pointer py-1.5 font-medium">
            Аквариум
          </Typography>
          <Link className="hidden lg:flex" to="/category">
            <Button className="hidden lg:flex" color="blue">
              Категории
            </Button>
          </Link>
        </div>
        <div className="relative flex lg:w-full lg:max-w-[28rem] h-max">
          <Input
            type="search"
            label="Поиск"
            color="blue"
            // value={email}
            // onChange={onChange}
            className="lg:pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color="blue"
            // disabled={!email}
            className="!absolute right-1 top-1 bottom-1 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="m-auto size-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Button>
        </div>
        <div className="hidden lg:flex flex-row gap-5">
          <Link to="/cart">
            <div className="flex flex-col items-center max-h-fit">
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
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </IconButton>
              <Typography variant="small" className="flex p-1 font-medium">
                Корзина
              </Typography>
            </div>
          </Link>
          {isAuth ? (
            <div
              onClick={onClickLogout}
              className="flex flex-col items-center max-h-fit"
            >
              <IconButton color="red">
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
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </IconButton>
              <Typography variant="small" className="flex p-1 font-medium">
                Выход
              </Typography>
            </div>
          ) : (
            <Link to="/login">
              <div className="flex flex-col items-center max-h-fit">
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
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </IconButton>
                <Typography variant="small" className="flex p-1 font-medium">
                  Вход
                </Typography>
              </div>
            </Link>
          )}
        </div>
        <i
          className="lg:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen ? (
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </i>
        {isMenuOpen ? (
          <div className="lg:hidden flex flex-col w-full">
            <li className="list-none">
              <Link to="/category">
                <Typography variant="small" className="flex pt-5 font-medium">
                  Категории
                </Typography>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/cart">
                <Typography variant="small" className="flex pt-5 font-medium">
                  Корзина
                </Typography>
              </Link>
            </li>
            <li className="list-none">
              {isAuth ? (
                <Typography onClick={onClickLogout} variant="small" className="flex pt-5 font-medium">
                  Выход
                </Typography>
              ) : (
                <Link to="/login">
                  <Typography variant="small" className="flex pt-5 font-medium">
                    Вход
                  </Typography>
                </Link>
              )}
            </li>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Navbar>
  );
}
