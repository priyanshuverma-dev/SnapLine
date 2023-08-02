import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div>
      <div className="font-sans flex text-center sm:flex-row sm:text-left justify-between py-4 px-6 bg-white shadow-lg sm:items-baseline w-full ">
        <Skeleton className="w-[100px] h-[32px]" />
        <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
      </div>
      <div className="flex flex-col justify-around items-center gap-5 w-full h-[20%] p-4">
        <div className="mt-2 flex items-center">
          <Skeleton className="h-10 w-[60vw] rounded border p-2" />
        </div>
      </div>
      <div className=" min-[400px]:container ">
        <div className="grid grid-flow-row grid-cols-1 m-2 p-3 space-y-3 bg-gray-50">
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
                    <Skeleton className="w-[70vw] h-3" />
                    <Skeleton className="w-[70vw] h-3" />
                    <Skeleton className="w-[70vw] h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <Skeleton className="w-[70vw] h-3" />
                    <Skeleton className="w-[70vw] h-3" />
                    <Skeleton className="w-[70vw] h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <Skeleton className="w-[70vw] h-3" />
                    <Skeleton className="w-[70vw] h-3" />
                    <Skeleton className="w-[70vw] h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <Skeleton className="w-[70vw] h-3" />
                    <Skeleton className="w-[70vw] h-3" />
                    <Skeleton className="w-[70vw] h-3" />
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

export default loading;
