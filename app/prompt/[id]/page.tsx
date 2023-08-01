import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Modal from "@/app/(components)/Modal";
import FeedCard from "@/app/(components)/FeedCard";
import serverAuth from "@/app/lib/serverAuth";
import { Prompt } from "@/Utils/prompt";

const fetchPrompt = async ({
  userId,
  promptId,
}: {
  userId: string;
  promptId: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/prompt/byuid`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      promptId,
    }),
  });

  if (res.status == 200) {
    const rs: Prompt = await res.json();

    return rs;
  } else {
    return "No Post";
  }
};

const PromptPage = async ({
  params: { id: promptId },
}: {
  params: { id: string };
}) => {
  const { currentUser } = await serverAuth();

  const prompt = await fetchPrompt({
    promptId,
    userId: currentUser.id,
  });

  if (prompt == "No Post") {
    return <p>No Post</p>;
  }

  return (
    <Modal>
      <div>
        <FeedCard prompt={prompt} />
      </div>
    </Modal>
  );
};

export default PromptPage;
