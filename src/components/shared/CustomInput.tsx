"use client";

import { useState, ChangeEvent } from "react";
import { CustomInputProps } from "@/lib/types";
import { X } from "lucide-react";

const CustomInput = ({
    type,
    placeholder,
    inputStyle,
    containerStyle,
    icon,
    onChange,
}: CustomInputProps) => {
    const [inputValue, setInputValue] = useState("");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (onChange) onChange(e);
        setInputValue(e.target.value);
    }

    return (
        <div
            className={`flex justify-between items-center gap-1 rounded-lg w-full ps-4 pe-2 py-0 my-2 bg-white ${containerStyle}`}
        >
            <input
                type={type}
                placeholder={placeholder}
                value={inputValue}
                className={`relative w-full py-3 outline-none border-none placeholder:text-sm text-sm bg-transparent ${inputStyle}`}
                onChange={handleChange}
            />
            {inputValue && (
                <X
                    size={15}
                    onClick={() => setInputValue("")}
                    className="text-gray-600"
                />
            )}
            <div className="text-gray-400 ms-1 cursor-pointer">{icon}</div>
        </div>
    );
};

export default CustomInput;
