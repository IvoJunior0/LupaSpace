import { useLocation, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { collection, deleteDoc, doc, getDoc, getDocs, increment, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";

import Loading from "../ui/components/extras/Loading";
import File from "../ui/components/Posts/File";
import TagsList from "../ui/components/Posts/TagsList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as likeActive, faThumbsDown as dislikeActive, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as likeDesactive, faThumbsDown as dislikeDesactive } from '@fortawesome/free-regular-svg-icons';

import parse from 'html-react-parser';

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import React from "react";

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

    // States de likes e dislikes
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeIcon, setLikeIcon] = useState(likeDesactive);
    const [dislikeIcon, setDislikeIcon] = useState(dislikeDesactive);

    const [loadingFeedback, setLoadingFeedback] = useState(false);
    const [userRef, setUserRef] = useState("");

    let timeAgo;

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                // Fetch do projeto
                const projectDoc = await getDoc(doc(db, 'Projects', projectId));
                if (projectDoc.exists()) {
                    setProjectData(projectDoc.data());
                    setUserRef(doc(db, 'Users', projectDoc.data().authorID));

                    const likePath = collection(db, `Users/${auth.currentUser.uid}/Likes`);
                    const dislikePath = collection(db,`Users/${auth.currentUser.uid}/Dislikes`);

                    const likeSnapshot = await getDocs(query(likePath, where("id", '==', projectId)));
                    const docLiked = likeSnapshot.docs.map(doc => ({ id: doc.id }));
                    if (docLiked[0]?.id === projectId) {
                        setLiked(true); setLikeIcon(likeActive); setLikesCount(projectDoc.data().likes); 
                    } else {
                        setLiked(false); setLikeIcon(likeDesactive); setLikesCount(projectDoc.data().likes);
                    }

                    const dislikeSnapshot = await getDocs(query(dislikePath, where("id", '==', projectId)));
                    const docDisliked = dislikeSnapshot.docs.map(doc => ({ id: doc.id }));
                    if (docDisliked.id === projectId) {
                        setDisliked(true); setDislikeIcon(dislikeActive); setDislikesCount(projectDoc.data().dislikes);
                    } else {
                        setDisliked(false); setDislikeIcon(dislikeDesactive); setDislikesCount(projectDoc.data().dislikes);
                    }
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

    const handleFeedback = async (value) => {
        setLoadingFeedback(true);
        const postRef = doc(db, `Projects/${projectId}`);
        const userRefPath = userRef.path;
        const feedbackObject = { id: projectId };
        try {
            // TODO: incrementar e diminuir no banco de dados o valor de like e dislike.
            // O documento serve só pra checar o id, por isso tem um objeto vazio.
            switch (value) {
                case "like":
                    if (!liked) {
                        const likesCollection = collection(db, userRefPath, "Likes");
                        await setDoc(doc(likesCollection, projectId), feedbackObject);
                        await updateDoc(postRef, { likes: increment(1) });
                        setLiked(true);
                        setLikeIcon(likeActive);
                        setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
                        return;
                    }
                    await deleteDoc(doc(db, `Users/${auth.currentUser.uid}/Likes`, projectId));
                    await updateDoc(postRef, { likes: increment(-1) });
                    setLiked(false);
                    setLikeIcon(likeDesactive);
                    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
                    break;
                case "dislike":
                    if (!disliked) {
                        const dislikesCollection = collection(db, userRefPath, "Dislikes");
                        await setDoc(doc(dislikesCollection, projectId), feedbackObject);
                        await updateDoc(postRef, { dislikes: increment(1) });
                        setDisliked(true);
                        setDislikeIcon(dislikeActive);
                        setDislikesCount((prev) => (disliked ? prev - 1 : prev + 1));
                        return;
                    }
                    await deleteDoc(doc(db, `Users/${auth.currentUser.uid}/Dislikes`, projectId));
                    await updateDoc(postRef, { dislikes: increment(-1) });
                    setDisliked(false);
                    setDislikeIcon(dislikeDesactive);
                    setDislikesCount((prev) => (disliked ? prev - 1 : prev + 1));
                    break;
            }
        } catch (error) {
            console.log(error); // TODO: resposta visual
        } finally {
            setLoadingFeedback(false);
        }
    }

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
                    <button onClick={() => handleFeedback("like")}>
                        <FontAwesomeIcon icon={likeIcon} />
                    </button>
                    <span>{likesCount}</span>
                    <button onClick={() => handleFeedback("dislike")}>
                        <FontAwesomeIcon icon={dislikeIcon} />
                    </button>
                    <span>{dislikesCount}</span>
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