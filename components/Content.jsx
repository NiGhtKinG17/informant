import React from "react";
import CrimePosts from "./CrimePosts";
import NewsPost from "./NewsPost";

const Content = () => {
  return (
    <div className=" space-x-3 mt-5 grid grid-cols-12 flex-1 mb-5">
      <CrimePosts />
      <NewsPost />
    </div>
  );
};

export default Content;
