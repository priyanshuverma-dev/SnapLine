"use client";

import CombinedListComponent from "@/components/CombinedListComponent";
import FeedCard from "@/components/FeedCard";
import LoadingModal from "@/components/LoadingView";
import RUserCard from "@/components/RUserCard";
import SearchData from "@/components/SearchData";
import SearchInput from "@/components/SearchInput";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Prompt } from "@/utils/prompt";
import { SearchResults } from "@/utils/search-results";
import { User } from "@/utils/user";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
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
const SearchPage = () => {
  const { data: currentUser, isLoading: isUser } = useCurrentUser();

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

  if (isUser) {
    return <LoadingModal />;
  }

  if (searchQuery == null) {
    return (
      <div className="flex items-center flex-col w-full">
        <SearchData currentUser={currentUser} />
      </div>
    );
  }

  if (error) {
    // if (error.message == "No Query Provided") {
    //   return (
    //     <div className="flex items-center flex-col">
    //       <SearchInput onPage />
    //       <span className="text-xl dark:text-white text-black text-center">
    //         Please enter a search query
    //       </span>
    //     </div>
    //   );
    // }
    console.log(error);
    return <p>error</p>;
  }

  if (!encodedSearchQuery) {
    <div>In Page Data</div>;
  }

  return (
    <div>
      <SearchInput onPage />
      <span className="text-xl dark:text-white p-4">
        Showing results for:{" "}
        <span className="font-semibold dark:text-white ">{searchQuery}</span>
      </span>
      {isLoading ? (
        <LoadingModal />
      ) : (
        <Tabs defaultValue="top" className="w-full p-4">
          <TabsList>
            <TabsTrigger value="top">Top</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="users">Accounts</TabsTrigger>
          </TabsList>
          <Separator orientation="horizontal" className="w-full mt-4" />
          <div>
            <TabsContent value="top">
              <CombinedListComponent data={data} currentUser={currentUser} />
            </TabsContent>
            <TabsContent value="prompts">
              <div className="flex flex-col space-y-3 p-4">
                {data?.prompts.map((prompt) => (
                  <FeedCard currentUser={currentUser} prompt={prompt} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="users">
              <div className="flex flex-col space-y-3 p-4">
                {data?.users.map((user) => (
                  <RUserCard user={user} currentUser={currentUser} />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      )}
    </div>
  );
};

export default SearchPage;
