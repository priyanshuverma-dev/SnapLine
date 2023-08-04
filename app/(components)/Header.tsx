"use client";
import React from "react";
const Header = () => {
  return (
    <div className="flex justify-around items-center w-full  p-4">
      <input
        //   disabled={isLoading}
        type="search"
        className="h-10 w-[60vw] shadow hover:shadow-xl focus:shadow-xl rounded border p-2 text-base outline-none placeholder:text-sm"
        placeholder="Search Prompai"
        onChange={(e) => {}}
      />
    </div>
  );
};

export default Header;
