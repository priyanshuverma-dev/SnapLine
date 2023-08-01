import React from "react";
import FeedCard from "./FeedCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Prompt } from "@/Utils/prompt";
import serverAuth from "../lib/serverAuth";
import Link from "next/link";

const fetchPrompts = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/prompt/get`, {
    method: "POST",
    body: JSON.stringify({
      userId,
    }),
  });

  if (res.status == 200) {
    const rs: Prompt[] = await res.json();

    return rs;
  } else {
    return "No Post";
  }
};

const FeedView = async () => {
  const { currentUser } = await serverAuth();

  const prompts = await fetchPrompts(currentUser.id);

  if (prompts == "No Post") {
    return <p>No Post</p>;
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 m-2 space-x-3 space-y-3">
      {prompts.map((prompt) => {
        return (
          <Link id={prompt.id} href={`prompt/${prompt.id}`}>
            <FeedCard prompt={prompt} />;
          </Link>
        );
      })}
    </div>
  );
};

export default FeedView;
