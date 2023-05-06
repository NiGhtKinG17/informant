import { Menu } from "@headlessui/react";
import {
  ForwardIcon,
  PlayIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const SortByItem = ({ name }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <div
          className={` flex items-center px-4 py-3 outline-none group text-sm ${
            active ? "bg-dark-green text-yellow-green" : "text-gray-white "
          }`}
        >
          <ForwardIcon
            className={`mr-3 h-5 w-5  ${
              active ? " text-yellow-green" : "text-gray-white "
            }`}
            aria-hidden="true"
          />{" "}
          {name}
        </div>
      )}
    </Menu.Item>
  );
};

export default SortByItem;
