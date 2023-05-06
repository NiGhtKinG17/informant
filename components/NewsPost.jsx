import { Menu } from "@headlessui/react";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import SortByItem from "./SortByItem";

import { motion } from "framer-motion";

const NewsPost = () => {
  const [crimeType, setCrimeType] = useState("robbery");
  const [selectedCrime, setSelectedCrime] = useState("Robbery");

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${crimeType}&language=en&apiKey=405c1d395d914266b5a6904aaf66449a`
      )
      .then((res) => {
        setPosts(res.data.articles.slice(0, 10));
      })
      .catch((err) => console.log(err));
  }, [crimeType]);
  return (
    <div className="rounded-lg backdrop-blur-sm bg-white/3  col-span-3 py-5">
      {/* Header Section */}
      <div className="flex items-center px-4">
        <div className="flex items-center space-x-2">
          <NewspaperIcon className="h-7 w-7 text-white/90" />
          <p className="bg-transparent text-2xl text-white">Latest News</p>
        </div>

        <Menu as="div" className="ml-auto relative">
          <Menu.Button
            as="button"
            className="text-dark-green  group bg-yellow-green flex items-center justify-center rounded-md py-2 px-4 outline-none "
          >
            <p className="text-md">{selectedCrime}</p>
            <ChevronDownIcon className="h-5 w-5 ml-2  " />
          </Menu.Button>
          <Menu.Items className="z-40 absolute right-0 w-56 mt-2 origin-top-right border border-gray-500 bg-form-gray divide-y divide-gray-600/25 rounded-md shadow-lg outline-none h-80 overflow-y-auto scrollbar border-none ">
            <div
              className=""
              onClick={() => {
                setCrimeType("assault");
                setSelectedCrime("Assault");
              }}
            >
              <SortByItem name="Assault" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("Bribery");
                setSelectedCrime("Bribery");
              }}
            >
              <SortByItem name="Bribery" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("child abuse");
                setSelectedCrime("Child A...");
              }}
            >
              <SortByItem name="Child Abuse" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("drug use");
                setSelectedCrime("Drug Use");
              }}
            >
              <SortByItem name="Drug Use" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("extortion");
                setSelectedCrime("Extortion");
              }}
            >
              <SortByItem name="Extortion" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("fraud");
                setSelectedCrime("Fraud");
              }}
            >
              <SortByItem name="Fraud" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("hijacking");
                setSelectedCrime("HiJack..");
              }}
            >
              <SortByItem name="Hijacking" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("kidnaping");
                setSelectedCrime("Kidnap..");
              }}
            >
              <SortByItem name="Kidnaping" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("prostitution");
                setSelectedCrime("prostitu..");
              }}
            >
              <SortByItem name="Prostitution" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("rape");
                setSelectedCrime("Rape");
              }}
            >
              <SortByItem name="Rape" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("robbery");
                setSelectedCrime("Robbery");
              }}
            >
              <SortByItem name="Robbery" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("terrorism");
                setSelectedCrime("Terrorism");
              }}
            >
              <SortByItem name="Terrorism" />
            </div>
            <div
              className=""
              onClick={() => {
                setCrimeType("theft");
                setSelectedCrime("Theft");
              }}
            >
              <SortByItem name="Theft" />
            </div>
          </Menu.Items>
        </Menu>
      </div>
      {/* News Section */}

      <div className="h-[550px] overflow-y-auto scrollbar pb-3 px-4 rounded-lg  mt-3 pt-1 space-y-3">
        {/* Post */}

        {posts.map((post, i) => {
          return (
            <motion.div
              initial={{ y: 500 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 + i * 0.275 }}
              className="flex flex-col bg-[#141515]/70 rounded-lg px-4 pt-4 pb-4 hover:shadow-sm hover:-translate-x-1.5 hover:transition-all hover:ease-in-out  hover:shadow-yellow-green "
              key={post.url}
            >
              {/* News Post Header */}
              <a className="flex flex-col space-y-2" href={post.url}>
                <div className="flex">
                  <h1 className="text-md">{`${post.title.substring(
                    0,
                    65
                  )}...`}</h1>
                </div>
                <div className="flex text-xs items-center">
                  <p>{post.source.name}</p>
                  <TimeAgo
                    className="ml-auto text-xs text-gray-500"
                    date={post.publishedAt}
                  />
                </div>

                {/* Description */}
                <div className="flex">
                  <p className="text-xs text-gray-500">
                    {`${post.description.substring(0, 84)}...`}
                  </p>
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsPost;
