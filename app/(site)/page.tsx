import FeedView from "@/components/FeedView";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <div>
      <SearchInput />
      <FeedView />
    </div>
  );
}
