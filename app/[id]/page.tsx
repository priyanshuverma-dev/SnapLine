"use client";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const params = useParams();

  const [profileData, setProfileData] = useState<User | null>(null);

  useEffect(() => {
    // Fetch profile data from your backend using the 'username'
    // This is where you'll verify if the username exists or not
    // Handle the scenario where the username is not found (e.g., return 404 status code)
    // If the username is found, set the profile data using 'setProfileData'
    // Example fetch using `fetch`:
    fetch(`/api/profiles/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          // Handle 404 error here (username not found)
          router.push("/404");
          return;
        }
        return response.json();
      })
      .then((data) => setProfileData(data))
      .catch((error) => {
        // Handle any other errors here
        console.error("Error fetching profile data:", error);
      });
  }, [params, router]);

  if (!profileData) {
    return <div>Loading...</div>; // Or you can show a loading spinner
  }

  return (
    <div>
      <div className="container mx-auto mt-8">
        <Button variant={"link"} onClick={() => router.back()}>
          Back
        </Button>
        <div className="flex justify-center items-center">
          <Avatar>
            <AvatarImage
              className="w-32 h-32 rounded-full border-4 border-blue-500"
              src={profileData.image}
            />
            <AvatarFallback>{profileData.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {profileData.name}
          </h1>
          <p className="text-lg text-gray-600">@{profileData.username}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
          <p className="mt-2 text-gray-700">{profileData.bio}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Interests</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>Writing</li>
            <li>Art</li>
            <li>Poetry</li>
            <li>Photography</li>
            {/* Add more interests here */}
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Social Media</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>
              <a
                href="https://twitter.com/johndoe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter: @johndoe
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/johndoe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram: @johndoe
              </a>
            </li>
            {/* Add more social media links here */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
