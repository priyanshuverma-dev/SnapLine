"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const CreatePage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="flex flex-row space-x-1">
          <div className="flex flex-col p-2">
            <span className="p-2">Create AI Service</span>
            <Button
              variant={"outline"}
              onClick={() => {
                router.push("/create-one/ai-service");
              }}
            >
              Create Service
            </Button>
          </div>
          <div className="flex flex-col p-2">
            <span className="p-2">Create Prompt</span>
            <Button
              variant={"secondary"}
              onClick={() => {
                router.push("/create-one/prompt");
              }}
            >
              Create Prompt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
