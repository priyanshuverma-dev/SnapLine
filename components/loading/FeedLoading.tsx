import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

const FeedLoading = () => {
  const nums = ["1", "2", "3", "4", "5"];
  return (
    <div className="space-y-4">
      {nums.map((idx) => (
        <Card key={idx} className="dark:border-gray-800">
          <CardContent>
            <div key={idx} className="flex items-start p-4">
              <div className="w-full">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2 space-x-1 flex-row">
                    <div>
                      <Skeleton className="rounded-full w-10 h-10" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center">
                        <Skeleton className=" w-[30vw] h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="p-2 ">
                    <Skeleton className="w-full h-20" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-row ">
                    <Skeleton className="rounded-lg w-8 h-8 m-2" />
                    <Skeleton className="rounded-lg w-8 h-8 m-2" />
                  </div>
                  <div className="flex flex-row ">
                    <Skeleton className="rounded-lg w-8 h-8 m-2" />
                    <Skeleton className="rounded-lg w-8 h-8 m-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedLoading;
