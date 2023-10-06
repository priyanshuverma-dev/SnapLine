"use client";
import getRandomImage from "@/lib/getRandomImage";
import Image from "next/image";
import { useEffect, useState } from "react";

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    getRandomImage()
      .then((image) => {
        setImageUrl(image);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <img
      alt=""
      src={imageUrl ?? ""}
      loading="eager"
      className="h-screen opacity-60 w-full object-cover"
    />
  );
};

export default RandomImage;
