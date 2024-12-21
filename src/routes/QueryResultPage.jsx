import { useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Página de resultado de pesquisa.
 * Ela só é acessável se os query parameters forem passado.
 * 
 * @example
 * Parâmetros:
 * @param {string} q - texto de pesquisa
 * @param {number} type - tipo de pesquisa (aluno ou projeto)
 * @param {Array} tag - disciplinas
 * @param {number} info - turma
 * 
 * @returns {JSX.Element} Componente renderizado.
 */
export default function QueryResultPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [loading, setLoading] = useState(false);

    return (
        <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2 text-gray-500">
            {queryParams.size === 0 ? <h1>Nenhum filtro selecionado.</h1> : <></>}
        </div>
    );
}