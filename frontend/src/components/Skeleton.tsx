import { AppBar } from "./AppBar"

export const SkeletonBlog = () => {
    return (
    <div role="status" className="animate-pulse">
        <AppBar></AppBar>

        <div className="flex justify-center mt-4">
                <div className="w-2/4 p-2 bg-white">
                    <div className="font-bold text-3xl">
                        <div className="h-6 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="text-sm text-slate-500 my-2">
                        <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div>
                        <div className="h-12 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                </div>
                <div className="w-1/6 p-2 bg-slate-100 ">
                    <div className="text-2xl mb-3">
                        <div className="h-2 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="">
                        <div className="flex mb-2 items-center">
                            <div className="w-8 h-8 mr-3 rounded-full bg-slate-400 flex flex-col justify-center text-center">
                            </div>
                            <div className="font-bold">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            </div> 
                        </div>
                        <div className="text-xs pl-4 font-light text-slate-800">
                            <div className="h-2 bg-gray-200 rounded-full"></div>
                        </div>   
                    </div>
                </div>    
        </div>
    </div>
    )
}

export const SkeletonBlogs = () => {
    return (
        <div role="status" className="animate-pulse">
            <div className="font-grotesk w-2/5 my-4 mx-auto">
                <div id="header" className="flex items-center p-2">
                    <div className="rounded-full bg-gray-400 w-7 h-7 flex flex-col justify-center text-center font-semibold mr-1"></div>
                    <div className="ml-1 mr-0.5">
                        <div className="h-6 bg-gray-200 rounded-full">
                            <div className="h-2 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="w-1 mx-2 h-1 rounded-full bg-slate-500"></div>
                    <div className="text-slate-500">
                        <div className="h-6 bg-gray-200 rounded-full"></div>
                    </div>
                </div>
                    <div className="text-wrap mb-2">
                        <div className="font-bold">
                            <div className="h-6 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="mt-2">
                            <div className="h-6 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                    <div className="font-thin text-slate-600">
                        <div className="h-6 bg-gray-200 rounded-full"></div>
                        <div className="h-3 w-1/5 bg-gray-200 rounded-full mt-2"></div>
                    </div>
                <div className="w-full bg-slate-200 h-0.5 mt-2"></div>
            </div>
        </div>
    )
}