import {
  ArrowPathRoundedSquareIcon,
  CheckBadgeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import image1 from "../public/money.jpg";
import image2 from "../public/domestic.jpg";
import image3 from "../public/joshua.jpg";

const TModal = ({
  address,
  title,
  desc,
  date,
  image,
  location,
  invisible,
  onClose,
}) => {
  const images = [image1, image2, image3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  if (!invisible) return null;
  return (
    <div
      className="z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center rounded-md"
      id="wrapper"
      onClick={(e) => {
        if (e.target.id === "wrapper") onClose();
      }}
    >
      <div className="flex flex-col  bg-[#141515] rounded-md w-[1250px] h-[650px] shadow-lg ">
        {/* header-section  */}
        <div className="flex items-center justify-between px-5 pt-3 text-white">
          <div className="flex items-center space-x-1">
            <div className="">
              <UserCircleIcon className="h-9 w-9 text-white/80" />
            </div>
            <div className="text-lg  ">
              <p className="italic text-white/80">
                r/{address.substring(0, 6)}...{address.substring(35, 42)}
              </p>
            </div>
          </div>

          <button className="bg-gray-500/5 px-3 rounded-md py-2 items-center flex space-x-2 group hover:bg-darkgreen/90 hover:text-yellow-green/90 focus:bg-dark-green focus:text-yellow-green">
            <p className="">Validate</p>
            <CheckBadgeIcon className="h-5 w-5" />
          </button>
          {/* <div
            className="hover:rounded-full hover:bg-dark-green group p-1"
            onClick={() => onClose()}
          >
            <XMarkIcon className="h-7 w-7 group-hover:text-yellow-green" />
          </div> */}
        </div>
        <hr className="w-[97%] mx-auto h-[1.5px] rounded-full mt-2 bg-gray-600/25 border-0 " />

        {/* Info-Section */}
        <div className="grid grid-cols-2 flex-1 px-5 py-3 space-x-5 ">
          <div className="bg-gray-500/3 flex flex-col rounded-lg px-5 pt-4 pb-3">
            <div className="flex-1">
              <div className="">
                <h1 className="text-2xl ">{title}</h1>
              </div>
              <div className="mt-1 h-[435px]  scrollbar-thin scrollbar-thumb-gray-500/50 scrollbar-track-input-black scrollbar-thumb-rounded-full scrollbar-track-rounded-full  overflow-y-auto">
                <p className="text-md text-white/50  leading-tight">{desc}</p>
              </div>
            </div>

            <div className="flex justify-between text-white/40">
              <div className="flex">
                {" "}
                <p> {location}</p>
              </div>
              <div className="flex">
                {" "}
                <p>{date}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-500/3 flex flex-col rounded-lg px-3 pt-3 relative py-3 group">
            <div
              className="w-full h-full rounded-2xl duration-500"
              style={{
                backgroundImage: `url(${images[currentIndex].src})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div
              className="hidden group-hover:block absolute top-[50%] -translate-x-0  left-5 text-2xl rounded-full p-2 bg-gray-600/80 text-white cursor-pointer"
              onClick={prevSlide}
            >
              <ChevronLeftIcon className="h-7 w-7" />
            </div>
            <div
              className="hidden group-hover:block absolute top-[50%] -translate-x-0   right-5 text-2xl rounded-full p-2 bg-gray-600/80 text-white cursor-pointer"
              onClick={nextSlide}
            >
              <ChevronRightIcon className="h-7 w-7" />
            </div>
          </div>
        </div>

        {/* Submit-Section */}
      </div>
    </div>
  );
};

export default TModal;
