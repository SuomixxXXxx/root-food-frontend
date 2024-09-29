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

import aquariumLogo from "../assets/aquariumLogo.svg";

const categories = [
  {
    icon: <div className="h-5 w-5"></div>,
    label: "Первое блюдо",
    image: "",
  },
  {
    icon: <div className="h-5 w-5" ></div>,
    label: "Второе блюдо",
  },
  {
    icon: <div className="h-5 w-5"></div>,
    label: "Напитки",
  },
  {
    icon: <div className="h-5 w-5" ></div>,
    label: "Выпечка",
  },
  {
    icon: <div className="h-5 w-5" ></div>,
    label: "Десерты",
  },
];

export default function SideBarWorker(){

    const[open,setOpen]=React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
      };

    return(
        <div className="flex h-screen">
            <Card className="  w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mt-4"><img src={aquariumLogo} alt="My aquariumLogo" /></div>
            <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <Typography color="blue-gray" className="mr-auto font-normal">
                Каталог
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
            {categories.map((item,index)=>(
              <ListItem key={index}>
                {item.image}
                {item.label}
              </ListItem>
            ))}
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          Сотрудники
        </ListItem>
            </Card>
        </div>

        

    );

}
