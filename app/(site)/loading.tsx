import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <div className=" min-[400px]:container ">
        <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 bg-gray-50  dark:bg-neutral-900">
          <div>
            <div className="bg-white  dark:bg-neutral-900 shadow hover:shadow-xl focus:shadow-xl rounded-lg p-4">
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
            <div className="bg-white dark:bg-neutral-900 shadow hover:shadow-xl focus:shadow-xl rounded-lg p-4">
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
            <div className="bg-white dark:bg-neutral-900 shadow hover:shadow-xl focus:shadow-xl rounded-lg p-4">
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
            <div className="bg-white shadow dark:bg-neutral-900 hover:shadow-xl focus:shadow-xl rounded-lg p-4">
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
    </div>
  );
};

export default Loading;
