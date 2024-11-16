import React from "react";

/**
 * Componente de tag específica na lista de tags de um projeto.
 * 
 * @param {Object} props - Objeto props passado pelo componente TagList.
 * @param {string} tagName Nome da tag a ser carregada.
 * 
 * @returns {JSX.Element} Componente renderizado
 */
export default function Tag({ tagName }) {
    return (
        <button className="flex justify-center items-center py-1.5 px-3.5 bg-slate-300 border-2 border-slate-400 rounded-full max-w-30 w-fit text-sm hover:bg-slate-400 hover:text-slate-50">
            {tagName}
        </button>
    );
}