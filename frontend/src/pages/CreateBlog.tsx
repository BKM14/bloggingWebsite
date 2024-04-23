import { useState } from "react";
import { AppBar } from "./Blogs"
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    async function submitBlog() {

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://medium-clone.balajikrishnamurthy2004.workers.dev/api/v1/blog/create', {
                method: "POST",
                body: JSON.stringify({title, content}),
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const { id } = await response.json();
            alert("Successfuly published. Redirecting to blog")
            navigate(`/blog/${id}`);
        } catch (e) {
            alert("Error publishing post. Try again");
            console.log(e);
        }
        
    }

    return (
        <div>
            <AppBar></AppBar>
            <div className="my-6 flex flex-col items-center">
                <div className="my-4 w-2/5">
                    <input onChange={(e) => {
                        setTitle(e.target.value);
                    }} type="text" placeholder={'Title'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-4 hover:border-blue-500 block w-full p-2.5 duration-150 focus:outline-0" />    
                </div>
                <div className="w-2/5">
                    <textarea onChange={(e) => {
                        setContent(e.target.value);
                    }} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 duration-150 hover:border-4 hover:border-blue-500 focus:outline-0" placeholder="Write your thoughts here..."></textarea>
                </div>
                <div className="mt-3">
                    <button onClick={title == "" ? () => {alert("Title cannot be null")} : submitBlog} type="button" className="text-white bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 hover:px-7 hover:py-4 duration-300 hover:font-bold hover:bg-green-700">Publish Blog</button>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}