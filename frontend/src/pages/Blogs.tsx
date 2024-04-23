import { BlogComponent } from "../components/BlogComponent"
import { Post } from "../components/BlogComponent";
import { Link } from "react-router-dom";
import { useBlogs } from "../hooks";
import { SkeletonBlogs } from "../components/Skeleton";

export const Blogs = () => {

    const {loading, blogs} = useBlogs();

    if (loading) {
        return (
            <div>
                <AppBar />
                <SkeletonBlogs></SkeletonBlogs>
                <SkeletonBlogs></SkeletonBlogs>
                <SkeletonBlogs></SkeletonBlogs>
            </div>
        )
    }

    return (
        <div>
            <AppBar></AppBar>
            {blogs.map((blog: Post, index: number) => {
                return (
                    <div key={index}>
                        <BlogComponent post={blog}></BlogComponent>
                    </div>
                )
            })}
        </div>
    )
}

export const AppBar = () => {
    return (
        <div>
            <div className="w-full p-2 border flex justify-between items-center">
                <Link to={'/blogs'} className="flex flex-col justify-center ml-2 text-3xl font-semibold">Medium</Link>
                <div className="flex items-center">
                    <Link to={'/create'} className="mr-2">
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center ">Publish</button>
                    </Link>
                    <div className="rounded-full bg-yellow-400 w-8 h-8 flex flex-col justify-center text-center font-semibold mr-2">A</div>
                </div>
            </div>
        </div>
    )
}