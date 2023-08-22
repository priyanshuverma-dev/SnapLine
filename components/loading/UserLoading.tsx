import React from "react";
import { Skeleton } from "../ui/skeleton";

const UsersLoading = () => {
  const nums = ["1", "2", "3", "4", "5"];
  return (
    <>
      {nums.map((idx) => {
        <div className="p-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div>
              <Skeleton className="h-10 w-16" />
            </div>
          </div>
          <div className="pt-4">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>;
      })}
    </>
  );
};

export default UsersLoading;
