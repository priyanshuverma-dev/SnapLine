"use client";
import RUserCard from "./RUserCard";
import fetcher from "@/lib/fetcher";
import { User } from "@/utils/user";
import React from "react";
import useSWR from "swr";
import { Separator } from "../ui/separator";
import UsersLoading from "../loading/UserLoading";

interface SearchDataProps {
  currentUser: User;
}

const SearchData: React.FC<SearchDataProps> = ({ currentUser }) => {
  const {
    data,
    isLoading,
    error,
  }: {
    data: {
      users: User[];
    };
    isLoading: boolean;
    error: any;
  } = useSWR(`/api/profiles/get`, fetcher, {
    revalidateOnFocus: true,
  });

  if (error) {
    console.log(error);
    if (error.response.status === 404) {
      return <span className="text-center">We are not popular Yet!</span>;
    }
    return <div>error</div>;
  }

  return (
    <div className="w-full p-2">
      {isLoading ? (
        <UsersLoading />
      ) : (
        <div className="flex flex-col space-y-3 sm:p-4">
          {data?.users.map((user) => (
            <>
              <RUserCard
                key={Math.random()}
                user={user}
                currentUser={currentUser}
              />
              <Separator orientation="horizontal" className="mt-4" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchData;
