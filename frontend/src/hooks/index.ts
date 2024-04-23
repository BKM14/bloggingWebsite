import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export interface Post {
    title: string,
    content: string,
    author: {
        name: string
    },
    date: string,
    id: string
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Post[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                fetch('https://medium-clone.balajikrishnamurthy2004.workers.dev/api/v1/blog/bulk', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }}).then((data) => {return data.json()}).then(data => {
                    setBlogs(data.posts);
                    setLoading(false);
                });
            } catch (e) {
                alert("Error fetching data. Try again");
            }
        } else {
            alert("Unauthorized");
        }
    }, []);

    return {loading, blogs}; 
}

export const useBlog = () => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Post>();
    const {id} = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            try {
                fetch(`https://medium-clone.balajikrishnamurthy2004.workers.dev/api/v1/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                }).then(response => response.json()).then(data => {
                    setBlog(data.post)
                    setLoading(false);
                });
            } catch (e) {
                alert("Error fetching data");
            }
        } else {
            alert("Unauthorized");
        }
    }, []);

    return {loading, blog}

}