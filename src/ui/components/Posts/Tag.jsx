import React from "react";

export default function Tag({ tagName }) {
    return (
        <button className="flex justify-center items-center py-1.5 px-3.5 bg-slate-300 border-2 border-slate-400 rounded-full max-w-30 w-fit text-sm hover:bg-slate-400 hover:text-slate-50">
            {tagName}
        </button>
    );
}