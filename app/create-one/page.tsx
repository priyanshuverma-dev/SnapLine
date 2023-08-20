// "use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CreatePage = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="flex flex-row space-x-1">
          <div className="flex flex-col p-2">
            <span className="p-2">Create AI Service</span>
            <Button variant={"outline"}>
              <Link href={"/create-one/ai-service"}>Register Service</Link>
            </Button>
          </div>
          <div className="flex flex-col p-2">
            <span className="p-2">Create Prompt</span>
            <Button variant={"secondary"}>
              <Link href={"/create-one/prompt"}>Create Prompt</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
