import {useState} from "react";
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
  Button
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import aquariumLogo from "../assets/aquariumLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../redux/slices/categories";
import Modal from "./Modal.jsx";
import { logout } from "../redux/slices/auth.js";

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

  const categories = useSelector((state) => state.categories);
  // const isCategoriesLoading = categories.categories.status === "loading";
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="flex h-screen">
      <Card className="w-full max-w-[20rem] p-3 shadow-xl shadow-blue-gray-900/5">
        <div className="mt-4">
          <img src={aquariumLogo} alt="My aquariumLogo" />
        </div>

        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
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
                  <ListItem className="flex items-center pl-6 cursor-pointer hover:bg-blue-100 transition-all duration-200 rounded-lg">
                    <Typography className="text-base font-medium text-blue-gray-700">
                      {item.name}
                    </Typography>
                  </ListItem>
                </Link>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          Сотрудники
        </ListItem>
        <Link to={"/dashboard/orders"}>
          <ListItem>
            Заказы
          </ListItem>
        </Link>
      </Card>
        <CardFooter>
          <div
            onClick={() => setOpenButton(true)}
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
        </CardFooter>
        <Modal open={openButton} onClose={() => setOpenButton(false)}>
        <Typography variant="h5" color="black">
          Вы действительно хотите выйти?
        </Typography>
        <div className="flex justify-between mt-2">
          <Button
            onClick={onClickLogout}
            color="blue"
            variant="contained"
          >
            Да
          </Button>
          <Button
            onClick={() => setOpenButton(false)}
            color="red"
            variant="contained"
          >
            Нет
          </Button>
        </div>
      </Modal>
    </div>
  );
}
