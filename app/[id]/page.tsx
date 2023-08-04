"use client";
import { User } from "@/Utils/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useProfiles from "@/hooks/use-profile";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "../(components)/LoadingOverlay";

const ProfilePage = () => {
  const router = useRouter();
  const params = useParams();

  const [profileData, setProfileData] = useState<User | null>(null);

  const { data, isLoading, error } = useProfiles(params.id as string);

  if (isLoading) {
    return <LoadingOverlay isLoading={isLoading} />;
  }

  if (error) {
    console.log(error);
    return router.push("/404");
  }

  if (profileData === null) {
    setProfileData(data);
  }
  if (!profileData) {
    return <div>Loading...</div>; // Or you can show a loading spinner
  }

  return (
    <div>
      <div className="flex flex-row ">
        {/* avatar and name */}
        <div className="flex flex-col p-4">
          <div className="p-2">
            <Avatar className="w-28 h-28 outline">
              <AvatarImage
                alt={`${profileData.name}'s profile pic`}
                src={profileData.image}
              />
              <AvatarFallback>{profileData.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <span className="text-center text-md font-semibold">
              {profileData.name}
            </span>
          </div>
          <div>
            <span className="text-center text-sm font-normal  text-blue-400 hover:underline">
              @{profileData.username}
            </span>
          </div>
        </div>

        {/* followers and edit btn */}
        <div className="flex flex-col p-4">
          <div className="flex flex-row items-center justify-center p-2 ">
            <div className="text-center p-6 ">
              <span className="font-light">12</span>
              <p>Followers</p>
            </div>
            <div className="text-center p-6">
              <span className="font-light">132</span>
              <p>Following</p>
            </div>
          </div>

          <Button className="w-full">Edit Profile</Button>
        </div>
      </div>

      <div>
        <span>{profileData.bio}</span>
      </div>
    </div>

    // <div>
    //   <div className="mx-auto mt-8">
    //     <div className="flex justify-center items-center">
    //       <Avatar>
    //         <AvatarImage
    //           className="w-32 h-32 rounded-full border-4 border-blue-500"
    //           src={profileData.image}
    //         />
    //         <AvatarFallback>{profileData.name[0]}</AvatarFallback>
    //       </Avatar>
    //     </div>
    //     <div className="mt-4 text-center">
    //       <h1 className="text-2xl font-bold text-gray-900">
    //         {profileData.name}
    //       </h1>
    //       <p className="text-lg text-gray-600">@{profileData.username}</p>
    //     </div>
    //     <div className="mt-8">
    //       <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
    //       <p className="mt-2 text-gray-700">{profileData.bio}</p>
    //     </div>
    //     <div className="mt-8">
    //       <h2 className="text-xl font-semibold text-gray-900">Interests</h2>
    //       <ul className="mt-2 list-disc list-inside text-gray-700">
    //         <li>Writing</li>
    //         <li>Art</li>
    //         <li>Poetry</li>
    //         <li>Photography</li>
    //         {/* Add more interests here */}
    //       </ul>
    //     </div>
    //     <div className="mt-8">
    //       <h2 className="text-xl font-semibold text-gray-900">Social Media</h2>
    //       <ul className="mt-2 list-disc list-inside text-gray-700">
    //         <li>
    //           <a
    //             href="https://twitter.com/johndoe"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             Twitter: @johndoe
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="https://instagram.com/johndoe"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             Instagram: @johndoe
    //           </a>
    //         </li>
    //         {/* Add more social media links here */}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProfilePage;
