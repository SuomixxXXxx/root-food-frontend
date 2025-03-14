import { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
  CardFooter,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import aquariumLogo from "../assets/aquariumLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../redux/slices/categories";
import Modal from "./Modal.jsx";
import { logout } from "../redux/slices/auth.js";
import SearchComponent from "./SearchComponent.jsx";

export default function SideBarWorker() {
  const [open, setOpen] = useState(0);
  const [openButton, setOpenButton] = useState(false);
  const navigate = useNavigate();
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logout());
    setOpenButton(false);
    navigate("/");
  };

  const isAdmin = localStorage.getItem("role") == "admin";

  console.log(isAdmin);
  const categories = useSelector((state) => state.categories);
  // const isCategoriesLoading = categories.categories.status === "loading";
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="flex flex-grow flex-col h-fit w-full max-w-[20rem] p-6 shadow-2xl shadow-light-blue rounded-xl bg-white">
      <div>
        <Typography variant="h5" className="font-bold text-xl">
          <img src={aquariumLogo} alt="My aquariumLogo" />
        </Typography>
      </div>
      <div>
        <SearchComponent></SearchComponent>
      </div>
      <Accordion
        className="mt-2"
        open={open === 1}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${
              open === 1 ? "rotate-180" : ""
            }`}
          />
        }
      >
        <ListItem className="p-0" selected={open === 1}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="border-b-0 p-3"
          >
            <Typography color="blue-gray" className="mr-auto font-normal">
              Каталог
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">
            {categories.categories.items.data?.map((item, index) => (
              <Link key={index} to={`/dashboard/category/${item.id}`}>
                <ListItem className="flex items-center pl-6 cursor-pointer hover:bg-blue-gray-50 transition-all duration-200 rounded-lg">
                  <Typography className="text-base font-medium text-blue-gray-700">
                    {item.name}
                  </Typography>
                </ListItem>
              </Link>
            ))}
          </List>
        </AccordionBody>
      </Accordion>
      <Link to={"/dashboard/orders"}>
        <ListItem>Заказы</ListItem>
      </Link>
      {isAdmin ? <ListItem>Сотрудники</ListItem> : ""}
      <Link to={"/dashboard/orders"}>
        <ListItem>Мой аккаунт</ListItem>
      </Link>
      <div className="mt-auto">
        <Button
          className="flex justify-center items-center bg-dark-red hover:shadow-none shadow-none gap-2 w-full normal-case text-base mt-2"
          size="sm"
          onClick={() => setOpenButton(true)}
        >
          <span className="text-xs md:text-base">Выход</span>
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
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </Button>
      </div>
      <Modal open={openButton} onClose={() => setOpenButton(false)}>
        <Typography variant="h5" color="black">
          Вы действительно хотите выйти?
        </Typography>
        <div className="flex justify-between mt-2 gap-32">
          <Button
            color="red"
            size="sm"
            className="flex justify-center items-center bg-dark-red hover:shadow-none shadow-none w-full normal-case text-base"
            onClick={onClickLogout}
          >
            Да
          </Button>
          <Button
            className="flex justify-center bg-base-blue items-center shadow-white shadow-none hover:shadow-none w-full normal-case text-base"
            size="sm"
            onClick={() => setOpenButton(false)}
          >
            Отмена
          </Button>
        </div>
      </Modal>
    </div>
  );
}
