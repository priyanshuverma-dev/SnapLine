"use client";
import LoadingModal from "../core/LoadingView";
import RUserCard from "./RUserCard";
import SearchInput from "../core/SearchInput";
import fetcher from "@/lib/fetcher";
import { User } from "@/utils/user";
import React from "react";
import useSWR from "swr";

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
    revalidateOnFocus: false,
  });

  if (error) {
    console.log(error);
    if (error.response.status === 404) {
      return <span className="text-center">We are not popular Yet!</span>;
    }
    return <div>error</div>;
  }

  return (
    <div className="w-full">
      <SearchInput onPage />
      {isLoading ? (
        <LoadingModal />
      ) : (
        <div className="flex flex-col space-y-3 p-4">
          {data?.users.map((user) => (
            <RUserCard
              key={Math.random()}
              user={user}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchData;
