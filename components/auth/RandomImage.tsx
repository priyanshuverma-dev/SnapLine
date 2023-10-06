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
      .catch((error) => {});
  }, []);
  return (
    <Image
      width={100}
      height={100}
      alt=""
      src={imageUrl}
      quality={80}
      priority
      className="h-screen opacity-60 w-full object-cover"
    />
  );
};

export default RandomImage;
