import React from 'react'
import { useEffect, useState } from 'react';
import File from './Posts/File';

import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from '../../config/firebase';

// Icones de like, dislike e favorito
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as likeActive, faThumbsDown as dislikeActive, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as likeDesactive, faThumbsDown as dislikeDesactive } from '@fortawesome/free-regular-svg-icons';

import parse from 'html-react-parser'; // Suporte a tags html nas descrições

import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';
import Tag from './Posts/Tag';
import TagsList from './Posts/TagsList';

/**
 * Componente que mostra o projeto na homepage e no perfil do usuário
 * @param {object} props - Informações do post em específico
 */
export default function Project({ post }) {
    const [userData, setUserData] = useState(null); // Objeto do usuário
    const [userUid, setUserUid] = useState("")
    const [loading, setLoading] = useState(true);
    
    // States de likes e dislikes
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeIcon, setLikeIcon] = useState(likeDesactive);
    const [dislikeIcon, setDislikeIcon] = useState(dislikeDesactive);

    const [loadingFeedback, setLoadingFeedback] = useState(false);
    const userRef = doc(db, 'Users', post.authorID);

    let timeAgo;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocSnap = await getDoc(userRef);
                if (userDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                    setUserUid(userDocSnap.id);

                    const likePath = collection(db, `Users/${auth.currentUser.uid}/Likes`);
                    const dislikePath = collection(db,`Users/${auth.currentUser.uid}/Dislikes`);

                    const likeSnapshot = await getDocs(query(likePath, where("id", '==', post.id)));
                    const docLiked = likeSnapshot.docs.map(doc => ({ id: doc.id }));
                    if (docLiked[0]?.id === post.id) {
                        setLiked(true); setLikeIcon(likeActive); setLikesCount(post.likes); 
                    } else {
                        setLiked(false); setLikeIcon(likeDesactive); setLikesCount(post.likes);
                    }

                    const dislikeSnapshot = await getDocs(query(dislikePath, where("id", '==', post.id)));
                    const docDisliked = dislikeSnapshot.docs.map(doc => ({ id: doc.id }));
                    if (docDisliked.id === post.id) {
                        setDisliked(true); setDislikeIcon(dislikeActive); setDislikesCount(post.dislikes);
                    } else {
                        setDisliked(false); setDislikeIcon(dislikeDesactive); setDislikesCount(post.dislikes);
                    }
                } else {
                    console.log("Usuário não encontrado"); // TODO: Resposta visual
                }
            } catch (err) {
                console.log('Erro ao buscar dados do usuário ', err); // TODO: Resposta visual
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [post.authorID, post.createdAt]);
    
    // TODO: Sistema de likes, dislikes e favoritos
    const handleFeedback = async (value) => {
        setLoadingFeedback(true);
        try {
            const userRefPath = userRef.path;
            const feedbackObject = { id: post.id };
            // O documento serve só pra checar o id, por isso tem um objeto vazio.
            switch (value) {
                case "like":
                    const likesCollection = collection(db, userRefPath, "Likes");
                    await setDoc(doc(likesCollection, post.id), feedbackObject);
                    setLikeIcon(likeActive);
                    console.log("like")
                    break;
                case "dislike":
                    const dislikesCollection = collection(db, userRefPath, "Dislikes");
                    await setDoc(doc(dislikesCollection, post.id), feedbackObject);
                    setDislikeIcon(dislikeActive);
                    console.log("dislike")
                    break;
            }
        } catch (error) {
            console.log(error); // TODO: resposta visual
        } finally {
            setLoadingFeedback(false);
        }
    }

    // TODO: trocar pela função convertDate.jsx
    if (!loading) {
        const convertedDate = new Date(post.createdAt.seconds * 1000);
        timeAgo = formatDistanceToNow(convertedDate, { includeSeconds: true, locale: ptBR });
    }

    return (
        <div className='flex flex-col gap-6 text-gray-500'>
            <hr/>
            <div className="grid sm:grid-cols-[auto_250px] sm:grid-rows-[1fr_auto_auto_auto] grid-rows-[1fr_auto_auto_auto_auto_auto] grid-cols-1 py-4 px-6 gap-3 border-2 border-transparent rounded-md hover:bg-slate-50 hover:border-gray-300 items-center">
                {loading ? <h1>Carregando informações...</h1> : (<>
                    <div className='col-span-1 grid grid-cols-[auto_1fr] grid-rows-2 gap-0'>
                        {!post.pfp ? (<h6 className='row-span-2 self-center'><Link to={`/user/${post.authorID}`}><FontAwesomeIcon icon={faCircleUser} className='text-5xl'/></Link></h6>) : (<h6>{post.pfp}</h6>)}
                        <h6 className='col-start-2 row-start-1 pl-3 text-xl'><Link to={`/user/${post.authorID}`}>{userData.name}</Link></h6>
                        <h6 className='col-start-2 row-start-2 pl-3 text-sm'>Há {timeAgo}</h6>
                    </div>
                    {/* TÍTULO */}
                    <div className="col-start-1 row-start-2">
                        <Link to={`user/${userUid}/projetos/${post.id}`} className='text-2xl font-bold'>{post.titulo}</Link>
                    </div>
                    {/* DESCRIÇÃO */}
                    <div className="col-start-1 row-start-3">
                        <p>{parse(post.descricao)}</p>
                    </div>
                    {/* LISTA DE TAGS */}
                    <div className="col-start-1 row-start-4">
                        <TagsList list={post.tags} />
                    </div>
                    {/* COMPONENTE DO ARQUIVO */}
                    <div className="sm:row-span-3 sm:col-start-2 sm:row-start-1 h-full">
                        <File filePath={post.fileURL} />
                    </div>
                    {/* Likes, dislikes e favoritar */}
                    <div className="flex items-start justify-center gap-2 ">
                        <button onClick={() => handleFeedback("like")}><FontAwesomeIcon icon={likeIcon} /></button>
                        {likesCount}
                        <button onClick={() => handleFeedback("dislike")}><FontAwesomeIcon icon={dislikeIcon} /></button>
                        {dislikesCount}
                    </div>
                </>)
                }
            </div>
        </div>
    );
}