import { ChangeEvent, MouseEventHandler } from "react"

type LoginInterface = {
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type: string | "text"
}

type TextInterface = Pick<LoginInterface, 'placeholder'>
type ButtonInterface = {
    placeholder: string,
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const LoginInput = ({placeholder, onChange, type}: LoginInterface) => {
    return (
        <input type={type} placeholder={placeholder} onChange={onChange} className="placeholder:text-slate-600 border-2 rounded-sm px-2 mb-3 hover:border-black duration-300"/>
    ) 
}

export const LoginLabel = ({placeholder}: TextInterface) => {
    return (
        <label className="text-black font-medium">{placeholder}</label>
    )
}

export const LoginButton = ({placeholder, onClick}: ButtonInterface) => {
    return (
        <button onClick={onClick} className="bg-black text-white rounded-md hover:p-1 duration-300 mt-2 font-semibold">{placeholder}</button>
    )
}