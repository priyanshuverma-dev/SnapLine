import React from "react";
import FeedCard from "./FeedCard";

const list = [];

const FeedView = () => {
  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 m-2 space-x-3 space-y-3">
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </div>
  );
};

export default FeedView;
