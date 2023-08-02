import React, { Suspense } from "react";
import FeedCard from "./FeedCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Prompt } from "@/Utils/prompt";
import serverAuth from "../lib/serverAuth";
import prisma from "@/app/lib/prisma";

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
    <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 bg-gray-50 ">
      {prompts.map((prompt) => {
        return (
          <FeedCard key={prompt.id} prompt={prompt} />

          // <Link id={prompt.id} href={`prompt/${prompt.id}`}>
          // </Link>
        );
      })}
    </div>
  );
};

export default FeedView;
