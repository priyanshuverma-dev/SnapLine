"use client";
import React from "react";
const Header = () => {
  return (
    <div className="flex flex-col justify-around items-center gap-5 w-full h-[20%] p-4 bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="mt-2 flex items-center">
        <input
          //   disabled={isLoading}
          type="search"
          className="h-10 w-[60vw] shadow hover:shadow-xl focus:shadow-xl rounded border p-2 text-lg outline-none placeholder:text-sm"
          placeholder="Search Prompai"
          onChange={(e) => {}}
        />
      </div>
    </div>
    // <div className=" flex flex-col justify-around items-center gap-5 w-full h-96 p-4 bg-gradient-to-br from-blue-500 to-purple-500">
    //   <div className="text-center mt-8">
    //     <h1 className="text-2xl font-bold text-white md:text-3xl sm:text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl">
    //       <span role="img" aria-label="Party Popper">
    //         🎉
    //       </span>
    //       Unlock Your Creativity: <span className="text-red-500">AI</span>
    //       -Powered Prompts for <span className="text-blue-500"> Endless </span>
    //       Inspiration
    //     </h1>
    //     <p className="mt-4 text-sm md:text-lg sm:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white">
    //       Discover boundless creativity with our AI-powered prompts! Unleash
    //       your imagination, spark new ideas, and explore exciting possibilities
    //       in writing, art, and more.
    //     </p>
    //   </div>
    //   <div>
    //     <div className="mt-2 flex items-center">
    //       <input
    //         //   disabled={isLoading}
    //         type="search"
    //         className="h-10 w-[60vw] shadow hover:shadow-xl focus:shadow-xl rounded border p-2 text-lg outline-none placeholder:text-sm"
    //         placeholder="Search Prompai"
    //         onChange={(e) => {}}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Header;
