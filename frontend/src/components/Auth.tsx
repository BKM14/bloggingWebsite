import { useState } from "react"
import { LoginButton, LoginInput, LoginLabel } from "./LoginComponent"
import { Quotes } from "./Quotes"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@bkm1482004/medium-common"

export const Auth = ({type}: {type: "signup" | "signin"}) => {
        const link: string = (type == "signup") ? "" : "signup"
        const navigate = useNavigate();

        const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: ""
    });


    async function loginRequest(): Promise<void> {
        try {
            const response = await fetch("https://medium-clone.balajikrishnamurthy2004.workers.dev/api/v1/user/signin", {
            method: "POST",
            body: JSON.stringify({email: postInputs.email, password: postInputs.password})
            });
            const { token, username } = await response.json();
            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem('username', username);
                alert("Login successful")
                navigate("/blogs");
            } else {
                alert("Error during login. Incorrect credentials");
            }
        } catch(e) {
            alert("Error sending request. Check logs")
            console.log(e);
        }
    }

    async function signupRequest(): Promise<void> {
        try {
            const response = await fetch("https://medium-clone.balajikrishnamurthy2004.workers.dev/api/v1/user/signup", {
            method: "POST",
            body: JSON.stringify(postInputs)
            });
            const { token, username } = await response.json();
            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("username", username);
                alert("Signup successful")
                navigate("/blogs");
            } else {
                alert("Error during login. Incorrect credentials");
            }
        } catch (e) {
            alert("Error sending request. Check logs")
            console.log(e)
        }
    }

    return (
        <div className="font-grotesk grid md:grid-cols-2">
            <div className="flex flex-col justify-center items-center py-4 h-screen">
                <div className="flex flex-col justify-center items-center mb-6">
                    
                    <p className="font-bold text-3xl">{type == "signup" ? "Create an account" : "Login"}</p>
                    <p className="text-sm text-slate-400 font-semibold">{type == "signup" ? "Already have an account? " : "Don't have an account? "}<Link to={`/${link}`} className="underline pt-2">{type=="signin" ? "Sign up" : "Sign in"}</Link></p>
                </div>
                <div className="flex flex-col justify-center">

                    {type == "signup" ? <div className="flex flex-col">
                        <LoginLabel placeholder={"Name"}></LoginLabel>
                        <LoginInput placeholder={"John"} type="text" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                name: e.target.value
                            }))
                        }}></LoginInput>
                    </div> : null}

                    <LoginLabel placeholder={"Email"}></LoginLabel>
                    <LoginInput placeholder={"john@gmail.com"} type="text" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            email: e.target.value
                        }))
                    }}></LoginInput>

                    <LoginLabel placeholder={"Password"}></LoginLabel>
                    <LoginInput placeholder="" type="password" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }}></LoginInput>

                    <LoginButton onClick={type == "signup" ? signupRequest : loginRequest} placeholder={type == "signup" ? "Sign up" : "Sign in"}></LoginButton>
                </div>
            </div>
            <div className=" px-6 font-bold bg-[#F3F4F6] h-screen flex items-center invisible md:visible">
                <Quotes></Quotes>
            </div>
        </div>
    )
}

