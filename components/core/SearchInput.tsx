"use client";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
const SearchInput = ({ onPage }: { onPage?: boolean }) => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(
      searchQuery.replace(/[;':{}[\]/?<>|_+!@$%&*()^&#%,""'']/g, "")
    );
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <form
      onSubmit={onSearch}
      className="flex justify-around items-center w-full p-4"
    >
      {" "}
      <Input
        //   disabled={isLoading}
        type="search"
        className="h-10 w-full shadow hover:shadow-xl focus:shadow-xl rounded border p-2 text-base outline-none placeholder:text-sm"
        placeholder="What are you looking for?"
        value={searchQuery || ""}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
};

export default SearchInput;
