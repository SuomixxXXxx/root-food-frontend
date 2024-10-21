import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import aquariumLogo from "../assets/aquariumLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../redux/slices/categories";

export default function SideBarWorker() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  // const isCategoriesLoading = categories.categories.status === "loading";
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="flex h-screen">
      <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mt-4">
          <img src={aquariumLogo} alt="My aquariumLogo" />
        </div>

        <Accordion
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
                  <ListItem className="flex items-center p-2 cursor-pointer hover:bg-blue-100 transition-all duration-200 rounded-lg">
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
        <Link to ={"/dashboard/orders"}>
          <ListItem>
            Заказы
          </ListItem>
        </Link>
      </Card>
    </div>
  );
}
