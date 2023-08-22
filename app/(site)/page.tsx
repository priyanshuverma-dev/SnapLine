import FeedView from "@/components/feed/FeedView";
import SearchInput from "@/components/core/SearchInput";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <SearchInput />
      <FeedView />
    </div>
  );
}
