import React from "react";

export default function TagSelector({ handleCheckboxChange, id, tag}) {
    return(
        <li className="flex items-center gap-3">
            <input type="checkbox" onChange={() => handleCheckboxChange(tag)} id={id} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={tag}></input>
            <label htmlFor={id} className="w-full text-[15px]">{tag}</label>
        </li>
    );
}