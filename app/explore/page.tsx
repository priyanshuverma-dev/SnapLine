"use client";

import LoadingModal from "@/components/LoadingView";
import SearchInput from "@/components/SearchInput";
import { SearchResults } from "@/utils/search-results";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  if (response.status == 400) {
    throw new Error("No Query Provided");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};
const page = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const {
    data,
    isLoading,
    error,
  }: {
    data: SearchResults;
    isLoading: boolean;
    error: any;
  } = useSWR(`/api/search?q=${encodedSearchQuery}`, fetchPosts, {
    revalidateOnFocus: false,
  });

  if (isLoading) {
    return <LoadingModal />;
  }

  if (error) {
    if (error.message == "No Query Provided") {
      return (
        <div className="flex items-center flex-col">
          <SearchInput onPage />
          <span className="text-xl dark:text-white text-black text-center">
            Please enter a search query
          </span>
        </div>
      );
    }
    console.log(error);
    return <p>error</p>;
  }

  if (!encodedSearchQuery) {
    <div>In Page Data</div>;
  }

  return (
    <div>
      <SearchInput onPage />
      <span className="text-xl dark:text-white">
        Showing results for:{" "}
        <span className="font-semibold dark:text-white ">{searchQuery}</span>
      </span>
      <div className="flex flex-col">
        {data?.prompts.map((post) => (
          <div key={post.id}>
            <p>{post.title}</p>
          </div>
        ))}

        {data?.users.map((post) => (
          <div key={post.id}>
            <p>{post.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
