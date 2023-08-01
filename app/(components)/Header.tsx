"use client";
import React from "react";
const Header = () => {
  return (
    <div className="flex flex-col justify-around items-center gap-5 w-full h-[20%] p-4">
      <div className="mt-2 flex items-center">
        <input
          //   disabled={isLoading}
          type="search"
          className="h-10 w-[60vw] shadow hover:shadow-xl focus:shadow-xl rounded border p-2 text-base outline-none placeholder:text-sm"
          placeholder="Search Prompai"
          onChange={(e) => {}}
        />
      </div>
    </div>
  );
};

export default Header;
