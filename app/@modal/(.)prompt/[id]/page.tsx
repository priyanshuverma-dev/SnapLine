import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Prompt } from "@/Utils/prompt";
import serverAuth from "@/app/lib/serverAuth";
import { BsFillPatchCheckFill } from "react-icons/bs";
import Modal from "@/app/(components)/Modal";

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

const PromptModal = async ({
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
      <>
        <div className="bg-white shadow-md hover:shadow-xl focus:shadow-xl rounded-lg p-4">
          <div className="flex items-start">
            <Image
              src={prompt.user.image}
              width={40}
              height={40}
              alt={`${prompt.user.name}'s Profile`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="flex items-center mb-2 space-x-1">
                <h3 className="font-bold text-gray-900">{prompt.user.name}</h3>
                <BsFillPatchCheckFill className=" text-blue-500" />
                <span className="ml-2 text-gray-600">
                  @{prompt.user.username}
                </span>
              </div>
              <p className="text-gray-800 md:text-md sm:text-sm">
                {prompt.text}
                {prompt.tags.map((tag) => {
                  return <span className="text-blue-600"> #{tag} </span>;
                })}
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center text-gray-600">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.246 11.246l-1.246 1.248a1 1 0 01-1.42-1.411l.094-.093 2.5-2.5a1 1 0 111.32 1.497l-.094.094-1.25 1.252z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>100 Likes</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm4 10a1 1 0 011 1v2a1 1 0 01-1.555.832L10 13.103l-2.445 2.729A1 1 0 016 15v-2a1 1 0 111.555-.832L10 12.897l1.445-1.62A1 1 0 0114 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>50 Retweets</span>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default PromptModal;
