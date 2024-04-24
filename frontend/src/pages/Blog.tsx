import { AppBar } from "../components/AppBar";
import { useBlog } from "../hooks";
import { SkeletonBlog } from "../components/Skeleton";


interface Blog {
    title: string,
    content: string,
    date: string,
    author: {
        name: string
    }
}

export const Blog = () => {
    const {loading, blog} = useBlog();

    if (loading) {
        return <div>
            <SkeletonBlog></SkeletonBlog>
        </div>
    }

    if (!blog) {
        return (
            <div>Blog not found</div>
        )
    }
    const date = blog.date.split("T")[0];

    return (
        <div className="h-screen">
            <AppBar></AppBar>
            <div className="flex justify-center mt-4">
                <div className="w-2/4 p-2 bg-white">
                    <div className="font-bold text-3xl">{blog.title}</div>
                    <div className="text-sm text-slate-500 my-2">Posted on {date}</div>
                    <div>{blog.content}</div>
                </div>
                <div className="w-1/6 p-2 bg-slate-100 ">
                    <div className="text-2xl mb-3">Author</div>
                    <div className="">
                        <div className="flex mb-2 items-center">
                            <div className="w-8 h-8 mr-3 rounded-full bg-slate-400 flex flex-col justify-center text-center">{blog.author.name[0].toUpperCase()}</div>
                            <div className="font-bold">{blog.author.name}</div> 
                        </div>
                        <div className="text-xs pl-4 font-light text-slate-800">Random catch phrase about the author's ability to grab the user's attention</div>   
                    </div>
                </div>    
            </div>
        </div>  
    )

}