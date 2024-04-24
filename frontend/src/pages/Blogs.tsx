import { BlogComponent } from "../components/BlogComponent"
import { Post } from "../components/BlogComponent";
import { useBlogs } from "../hooks";
import { SkeletonBlogs } from "../components/Skeleton";
import { AppBar } from "../components/AppBar";

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
