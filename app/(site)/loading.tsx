import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 ">
        <div>
          <div>
            <div className="flex items-start">
              <div>
                <div className="flex items-center mb-2 space-x-1">
                  <Skeleton className="h-12 w-12 rounded-full" />

                  <Skeleton className="h-4 w-[20vw]" />
                  <Skeleton className="h-4 w-[30vw]" />
                </div>
                <div className="bg-gray-100  dark:bg-neutral-900 rounded p-2 space-y-2">
                  <Skeleton className="w-[50vw] h-3" />
                  <Skeleton className="w-[50vw] h-3" />
                  <Skeleton className="w-[50vw] h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-start">
              <div>
                <div className="flex items-center mb-2 space-x-1">
                  <Skeleton className="h-12 w-12 rounded-full" />

                  <Skeleton className="h-4 w-[20vw]" />
                  <Skeleton className="h-4 w-[30vw]" />
                </div>
                <div className="bg-gray-100 dark:bg-neutral-900 rounded p-2 space-y-2">
                  <Skeleton className="w-[50vw] h-3" />
                  <Skeleton className="w-[50vw] h-3" />
                  <Skeleton className="w-[50vw] h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-start">
              <div>
                <div className="flex items-center mb-2 space-x-1">
                  <Skeleton className="h-12 w-12 rounded-full" />

                  <Skeleton className="h-4 w-[20vw]" />
                  <Skeleton className="h-4 w-[30vw]" />
                </div>
                <div className="bg-gray-100 dark:bg-neutral-900 rounded p-2 space-y-2">
                  <Skeleton className="w-[50vw] h-3" />
                  <Skeleton className="w-[50vw] h-3" />
                  <Skeleton className="w-[50vw] h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-start">
              <div>
                <div className="flex items-center mb-2 space-x-1">
                  <Skeleton className="h-12 w-12 rounded-full" />

                  <Skeleton className="h-4 w-[20vw]" />
                  <Skeleton className="h-4 w-[30vw]" />
                </div>
                <div className="bg-gray-100 dark:bg-neutral-900 rounded p-2 space-y-2">
                  <Skeleton className="w-[50vw] h-3" />
                  <Skeleton className="w-[50vw] h-3" />
                  <Skeleton className="w-[50vw] h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
