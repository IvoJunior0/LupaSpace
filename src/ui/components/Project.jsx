import React from 'react'
import { useEffect, useState } from 'react';
import File from './Posts/File';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../../config/firebase';

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
export default function Project(props) {
    const [userData, setUserData] = useState(null); // Objeto do usuário
    const [userUid, setUserUid] = useState("")
    const [loading, setLoading] = useState(true);
    
    // States de likes e dislikes
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [likeIcon, setLikeIcon] = useState(null);
    const [dislikeIcon, setDislikeIcon] = useState(null);

    let timeAgo;
    const post = props.post;    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'Users', post.authorID));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                    setUserUid(userDoc.id);
                } else {
                    console.log("Usuário não encontrado"); // TODO: Resposta visual
                }
            } catch (err) {
                console.log('Erro ao buscar dados do usuário'); // TODO: Resposta visual
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [post.authorID, post.createdAt]);
    
    // TODO: Sistema de likes, dislikes e favoritos
    const handleLike = () => {
        
    }

    // Convertendo a data que vem do banco de dados
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
                        <button onClick={handleLike}><FontAwesomeIcon icon={likeDesactive} /></button>
                        {post.likes}
                        <button><FontAwesomeIcon icon={dislikeDesactive} /></button>
                        {post.dislikes}
                    </div>
                </>)
                }
            </div>
        </div>
    );
}