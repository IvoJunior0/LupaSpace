import { useLocation, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import Loading from "../ui/components/extras/Loading";
import File from "../ui/components/Posts/File";
import TagsList from "../ui/components/Posts/TagsList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as likeActive, faThumbsDown as dislikeActive, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as likeDesactive, faThumbsDown as dislikeDesactive } from '@fortawesome/free-regular-svg-icons';

import parse from 'html-react-parser';

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

/**
 *  Página com detalhes do projeto feito pelo usuário.
 */
export default function ProjectPage() {
    const { projectId } = useParams();
    const location = useLocation();

    const [projectData, setProjectData] = useState();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    let timeAgo;

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                // Fetch do projeto
                const projectDoc = await getDoc(doc(db, 'Projects', projectId));
                if (projectDoc.exists()) {
                    setProjectData(projectDoc.data());
                } else {
                    setError(true);
                }

                // Fetch do usuário
                const path = location.pathname;
                const userId = path.split("/")[2];

                // TODO: transformar isso numa função pra usar no resto do código
                const userDoc = await getDoc(doc(db, 'Users', userId));

                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    console.log('Usuário não encontrado');
                }
                setLoading(false);
            } catch (err) {
                console.log("Erro: " + err) // TODO: resposta visual
            }
        }
        fetchProjectData();
    }, []);

    if (loading) return <Loading/>

    /**
     * Copiar o link da página para a àrea de transferência.
     * 
     * @param {string} shareLink Link de compartilhamento.
     */
    async function clipboardShareLink(shareLink) {
        try {
            await navigator.clipboard.writeText(shareLink);
        } catch (error) {
            console.log("Erro ao copiar link de compartilhamento: " + error); // TODO: resposta visual
        }
    }

    // TODO: trocar pela função convertDate.jsx
    if (!loading && !error) {
        const convertedDate = new Date(projectData.createdAt.seconds * 1000);
        timeAgo = formatDistanceToNow(convertedDate, { includeSeconds: true, locale: ptBR });
    }

    return(
        <>
            {/* TODO: criar dps uma página bonitinha de erro 404 */}
            {error ? <h1>Projeto não encontrado</h1> : (<>
                {/* Títutlo */}
                <div>
                    <h1 className="text-3xl font-bold hover:underline hover:cursor-pointer" onClick={() => clipboardShareLink(window.location.href)}>{projectData.titulo}</h1>
                </div>
                {/* Informações do autor */}
                <div className="text-sm">
                    <h4>Publicado por {userData.name} - Há {timeAgo}</h4>
                </div>
                {/* Conteúdo */}
                <div className="">
                    <p>{parse(projectData.descricao)}</p>
                </div>
                {/* Arquivo */}
                <div className="">
                    <File filePath={projectData.fileURL}/>
                </div>
                {/* Likes, dislikes, e favoritos */}
                <div className="flex gap-1.5">
                    <button>
                        <FontAwesomeIcon icon={likeDesactive} />
                    </button>
                    <span>
                        {projectData.likes}
                    </span>
                    <button>
                        <FontAwesomeIcon icon={dislikeDesactive} />
                    </button>
                    <span>
                        {projectData.dislikes}
                    </span>
                </div>
                {/* Lista de tags */}
                <div className="">
                    <TagsList list={projectData.tags} />
                </div>
                <hr className="border-2"/>
                <div className="">
                    <h1 className="text-2xl font-bold">Comentários</h1>
                </div>
            </>)}
        </>
    );
}