import React from "react"
import clsx from "clsx"

interface InputProps {
    label: string;
    id: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string
}

export const Input: React.FC<InputProps> = ({ label, id, type, value, setValue, disabled, placeholder }) => {
    return (
        <div className="my-1">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-zinc-900">
                {label}
            </label>
            <div className="mt-5">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className={clsx("block w-full rounded-md border-0 py-1.5 px-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 ", disabled && "opacity-50 cursor-default")}
                />
            </div>
        </div>
    )
}