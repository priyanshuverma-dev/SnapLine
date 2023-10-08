import FeedView from "@/components/feed/FeedView";
import SearchInput from "@/components/core/SearchInput";

export default function Home() {
  return (
    <div
      className="
      flex justify-center items-center flex-col 
      max-w-[60rem] w-full h-full mx-auto px-4
    "
    >
      <SearchInput />
      <FeedView />
    </div>
  );
}
