import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import capitalizeText from "../functions/capitalizeText";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import Project from "../ui/components/Project";
import Loading from "../ui/components/extras/Loading";
import UserBox from "../ui/components/search/UserBox";
import generateProjectKeywords from "../functions/generateProjectKeywords";

/**
 * Função que retorna o resultado da busca.
 * Depende do tipo de pesquisa do usuário (aluno ou projeto).
 * 
 * @param {string} queryType Tipo de pesquisa.
 * @param {string} queryText Texto de busca.
 * @param {number} turma Turma do aluno (o tipo de pesquisa for aluno).
 * 
 * @returns Lista de resultados de busca.
 */
const fetchQueryData = async (queryType, queryText, turma) => {
    try {
        if (queryType === "alunos") {
            const q = query(
                collection(db, "Users"),
                ("searchKeywords", "array-contains", queryText.toLowerCase()),
                where("turma", "==", turma)
            );

            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        }
        if (queryType === "projetos") {
            const q = query(
                collection(db, "Projects"),
                where("searchKeywords", "array-contains", queryText.toLowerCase())
            );

            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        }
        return [];
    } catch (error) {
        console.error("ERRO: " + error); // TODO: resposta visual
    }
};

/**
 * Página de resultado de pesquisa.
 * Ela só é acessável se os query parameters forem passado.
 * 
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

    // Parâmetros
    const queryText = queryParams.get('q');
    const queryType = queryParams.get('type');
    // NOTA: quando não forem passadas as tags, a variável tags terá o tipo UNDEFINED
    const tags = queryParams.get('tag')?.split(',').map(item => item.trim()); // Formatação de string para array
    const turma = Number(queryParams.get('info'));

    // Resultado de pesquisa
    const [alunos, setAlunos] = useState([]);
    const [projetos, setProjetos] = useState([]);

    const [loading, setLoading] = useState(false);

    console.log("queryText :" + queryText);

    useEffect(() => {
        // TODO: fazer isso aqui ser uma função fora do componente
        const queryData = async () => {
            setLoading(true);
            try {
                const resultadoAluno = await fetchQueryData(queryType, queryText, turma);
                if (queryType === "alunos") setAlunos(resultadoAluno);
                else setProjetos(resultadoAluno);
            } catch (error) {
                console.error("Erro ao buscar os dados: ", error); // TODO: resposta visual
            } finally {
                setLoading(false);
            }
        };
        queryData();
        console.log(alunos);
    }, []);
    console.log(typeof(turma));

    if (loading) {
        return (
            <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2 text-gray-500">
                <Loading />
            </div>
        )
    }

    return (
        <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2 text-gray-500">
            {queryParams.size === 0 ? <h1>Nenhum filtro selecionado.</h1> : <></>}
            {queryType === "alunos" ? <>
                <ul className='flex flex-col gap-6'>
                    {alunos.map(aluno => (
                        <li key={aluno.id}>
                            <UserBox props={aluno} />
                        </li>
                    ))}
                </ul>
            </> : <></>}
            {queryType === "projetos" ? <>
                <ul className="flex flex-col gap-6">
                    {projetos.map(aluno => (
                        <li key={aluno.id}>
                            {console.log(aluno)}
                        </li>
                    ))}
                </ul>
            </> : <></>}
        </div>
    );
}