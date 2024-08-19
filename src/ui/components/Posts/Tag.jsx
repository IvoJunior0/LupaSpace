import React from "react";

export default function Tag({ tagName }) {
    return (
        <div className="flex justify-center items-center py-0.5 bg-slate-300 border-2 border-slate-400 rounded-full max-w-20 w-full hover:bg-slate-400">
            <h1>{tagName}</h1>
        </div>
    );
}