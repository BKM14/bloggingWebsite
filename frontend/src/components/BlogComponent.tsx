import { Link } from "react-router-dom";

export interface Post {
    title: string,
    content: string,
    author: {
        name: string
    },
    date: string,
    id: string
}

export const BlogComponent = ({post}: {post: Post}) => {
    const authorName = post.author.name;
    const initialName = authorName[0].toUpperCase();
    const date = post.date.split("T")[0];
    const contentLength = post.content.length;

    return (
        <div>
            <div>
                <div className="font-grotesk w-2/5 my-4 mx-auto">
                    <div id="header" className="flex items-center p-2">
                        <div className="rounded-full bg-yellow-400 w-7 h-7 flex flex-col justify-center text-center font-semibold mr-1">{initialName}</div>
                        <div className="ml-1 mr-0.5">{authorName}</div>
                        <div className="w-1 mx-2 h-1 rounded-full bg-slate-500"></div>
                        <div className="text-slate-500">{date}</div>
                    </div>
                    <Link to={`/blog/${post.id}`} className="mb-3 mt-0">
                        <div className="text-wrap mb-2">
                            <div className="font-bold">{post.title}</div>
                            <div className="mt-2">{contentLength > 100 ? post.content.substring(0, 100) + " ..." : post.content}</div>
                        </div>
                        <div className="font-thin text-slate-600">{`${Math.ceil(contentLength / 100)} minute read`}</div>
                    </Link>
                    <div className="w-full bg-slate-200 h-0.5"></div>
                </div>
            </div>
        </div>
        
    )
}

