import {
  ArrowPathRoundedSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState, useContext } from "react";
import { InfoContext } from "@/pages/_app";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

const CreatePostModal = ({ invisible, onClose }) => {
  const crimetypes = [
    "Assault",
    "Bribery",
    "Extortion",
    "Fraud",
    "Hijaking",
    "Kidnaping",
    "Prostitution",
    "Rape",
    "Robbery",
    "Terrorism",
    "Theft",
  ];

  //Form Data
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");

  //Web3 Part
  const { state, account } = useContext(InfoContext);
  const { provider, signer, contract } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const createPost = toast.loading("Posting Crime Post");
    try {
      const amount = { value: ethers.utils.parseEther("0.01") };
      const addPost = await contract.addPost(
        title,
        type,
        desc,
        date,
        image,
        location,
        amount
      );
      // toast.success("Crime Post added successfully", {
      //   id: createPost,
      // });
    } catch (e) {
      console.log(e);
      // toast.error("Something went wrong!", {
      //   id: createPost,
      // });
    }
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
      <div className="flex flex-col  bg-form-gray/95 rounded-md w-[450px] h-[550px] shadow-lg ">
        {/* header-section  */}
        <div className="flex items-center justify-between px-4 py-3 text-white">
          <div>
            <h1 className="text-xl ">Create Criminal Post</h1>
          </div>
          <div
            className="hover:rounded-full hover:bg-dark-green group p-1"
            onClick={() => onClose()}
          >
            <XMarkIcon className="h-7 w-7 group-hover:text-yellow-green" />
          </div>
        </div>
        <hr className="w-[93%] mx-auto h-[1.5px] rounded-full  bg-gray-600/25 border-0 " />

        {/* Info-Section -- Form Section */}

        <form
          className="px-4 flex-1 pb-4 mt-2 space-y-4 overflow-y-auto scrollbar"
          onSubmit={handleSubmit}
        >
          {/* Crime Title */}
          <div className="flex flex-col space-y-2">
            <div className="">
              <label htmlFor="" className="">
                Title
              </label>
            </div>
            <div className="flex">
              <input
                required
                type="text"
                placeholder="Crime title"
                className="flex-1  bg-input-black outline-none text-white text-md  p-1.5 rounded-md px-2.5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {/* Crime Type */}
          {/* <div className="flex flex-col space-y-2">
            <div className="">
              <label htmlFor="" className="">
                Type
              </label>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Crime title"
                className="flex-1  bg-input-black outline-none text-white text-md  p-1.5 rounded-md px-2.5"
                value={form.type}
              />
            </div>
          </div> */}

          {/* Crime Type */}
          <div className="flex flex-col space-y-2">
            <div className="">
              <label htmlFor="" className="">
                Type
              </label>
            </div>
            <div className="flex">
              <select
                className="flex-1  bg-input-black outline-none text-white/50 text-md  p-2 rounded-md px-1.5"
                id=""
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                required
              >
                {crimetypes.map((type) => {
                  return (
                    <option key={type} value={type} className="text-white">
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* Crime Description */}
          <div className="flex flex-col space-y-2">
            <div className="">
              <label htmlFor="">Description</label>
            </div>
            <div className="flex">
              <textarea
                required
                type="text"
                placeholder="Crime description"
                className="flex-1 bg-input-black outline-none text-white text-md  p-1.5 rounded-md  scrollbar-thin scrollbar-thumb-gray-500/50 scrollbar-track-input-black scrollbar-thumb-rounded-full scrollbar-track-rounded-full px-2.5"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          {/* Crime Date and time */}
          {/* <div className="flex flex-col space-y-2">
            <div className="">
              <label htmlFor="">Date & Time</label>
            </div>
            <div className="flex">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                className="w-full text-center bg-input-black py-1 rounded-md outline-none  text-gray-200"
              />
            </div>
          </div> */}

          {/* Crime Date  */}

          <div className="flex flex-col space-y-2">
            <div className="">
              <label htmlFor="">Date</label>
            </div>
            <div className="flex">
              <input
                required
                type="date"
                placeholder="Crime location"
                className="flex-1  bg-input-black outline-none text-white text-md  p-1.5 px-2.5 rounded-md "
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Crime Images */}
          <div className="flex flex-col space-y-2">
            <div className="">
              <label htmlFor="">Image Url</label>
            </div>
            <div className="flex">
              <input
                required
                type="text"
                placeholder="Crime Images"
                className="flex-1  bg-input-black outline-none text-white text-md  p-1.5 px-2.5 rounded-md "
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          {/* Crime Location */}
          <div className="flex flex-col space-y-2">
            <div className="">
              <label htmlFor="">Location</label>
            </div>
            <div className="flex">
              <input
                required
                type="text"
                placeholder="Crime location"
                className="flex-1  bg-input-black outline-none text-white text-md  p-1.5 px-2.5 rounded-md "
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          {/* Crime Crime Media */}
          {/* <div className="grid grid-cols-3 pr-2 items-center">
            <div className="col-span-1">
              <label htmlFor="">Crime Media: </label>
            </div>
            <div className="col-span-2 flex">
              <input
                multiple="multiple"
                type="file"
                placeholder="Enter the crime description"
                className="flex-1  bg-transparent outline-none text-black border border-gray-300 p-1.5 rounded-md"
              />
            </div>
          </div> */}
          <button
            className="w-full bg-black  text-white px-7 py-2 hover:bg-dark-green hover:text-yellow-green hover:shadow-lg rounded-md flex items-center justify-center group"
            type="submit"
          >
            <p>Post</p>
            <ArrowPathRoundedSquareIcon className="h-5 w-5 ml-2 transition-all duration-500 ease-out group-hover:rotate-180 " />
          </button>
        </form>
        {/* Submit-Section */}
      </div>
    </div>
  );
};

export default CreatePostModal;
