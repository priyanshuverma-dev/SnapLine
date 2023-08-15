"use client";

import FeedCard from "@/components/FeedCard";
import LoadingModal from "@/components/LoadingView";
import RUserCard from "@/components/RUserCard";
import SearchInput from "@/components/SearchInput";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Prompt } from "@/utils/prompt";
import { SearchResults } from "@/utils/search-results";
import { User } from "@/utils/user";
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

  if (isLoading || isUser) {
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
      <span className="text-xl dark:text-white p-4">
        Showing results for:{" "}
        <span className="font-semibold dark:text-white ">{searchQuery}</span>
      </span>
      <Tabs defaultValue="top" className="w-full p-4">
        <TabsList>
          <TabsTrigger value="top">Top</TabsTrigger>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
          <TabsTrigger value="users">Accounts</TabsTrigger>
        </TabsList>
        <Separator orientation="horizontal" className="w-full mt-4" />
        <TabsContent value="top">
          <CombinedListComponent data={data} currentUser={currentUser} />
          {/* <div className="flex flex-col space-y-3 p-4">
            {data?.prompts.map((prompt) => (
              <FeedCard currentUser={currentUser} prompt={prompt} />
            ))}

            <Separator orientation="horizontal" className="w-full mt-4" />

            {data?.users.map((user) => (
              <RUserCard user={user} currentUser={currentUser} />
            ))}
          </div> */}
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
      </Tabs>
    </div>
  );
};

export default SearchPage;

interface CombinedListComponentProps {
  data: {
    users: User[]; // Replace with your user type
    prompts: Prompt[]; // Replace with your prompt type
  };
  currentUser: User; // Replace with your user type
}

const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const CombinedListComponent: React.FC<CombinedListComponentProps> = ({
  data,
  currentUser,
}) => {
  const combinedList = [...data?.users, ...data?.prompts]; // Combine the lists
  const shuffledList = shuffleArray(combinedList); // Shuffle the combined list

  return (
    <div className="flex flex-col space-y-3 p-4">
      {shuffledList.map((item, index) =>
        "username" in item ? (
          <RUserCard key={index} user={item} currentUser={currentUser} />
        ) : (
          <FeedCard key={index} currentUser={currentUser} prompt={item} />
        )
      )}
    </div>
  );
};
