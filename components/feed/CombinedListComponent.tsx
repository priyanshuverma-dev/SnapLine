import { User } from "@/utils/user";
import FeedCard from "./FeedCard";
import RUserCard from "../search/RUserCard";
import { Prompt } from "@/utils/prompt";

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
    <div className="flex flex-col space-y-3 sm:p-4">
      {shuffledList.flatMap((item, index) =>
        "username" in item ? (
          <RUserCard key={index} user={item} currentUser={currentUser} />
        ) : (
          <FeedCard key={index} currentUser={currentUser} prompt={item} />
        )
      )}
    </div>
  );
};
export default CombinedListComponent;
