import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
export default function Header() {
  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="max-w-full rounded-none from-blue-gray-900 to-blue-gray-800"
    >
      <div className="flex flex-row justify-between flex-wrap">
        <Button>Hello</Button>

        <div className="relative flex w-full max-w-[28rem]">
          <Input
            type="email"
            label="Поиск"
            // value={email}
            // onChange={onChange}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            // color={email ? "gray" : "blue-gray"}
            // disabled={!email}
            className="!absolute right-1 top-1 bottom-1 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Button>
        </div>

        <Button>Hello</Button>
      </div>
    </Navbar>
  );
}
