import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PromptSkeletion = () => {
  return (
    <div>
      <div className="bg-white shadow hover:shadow-xl focus:shadow-xl rounded-lg p-4">
        <div className="flex items-start">
          <div>
            <div className="flex items-center mb-2 space-x-1">
              <Skeleton className="h-12 w-12 rounded-full" />

              <Skeleton className="h-4 w-[20vw]" />
              <Skeleton className="h-4 w-[30vw]" />
            </div>
            <div className="bg-gray-100 rounded p-2 space-y-2">
              <Skeleton className="w-[50vw] h-3" />
              <Skeleton className="w-[50vw] h-3" />
              <Skeleton className="w-[50vw] h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptSkeletion;
