"use client";

import SearchInput from "@/components/SearchInput";
import { SearchResults } from "@/utils/search-results";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};
const page = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const router = useRouter();

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
    return <p>loading</p>;
  }

  if (error) {
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
