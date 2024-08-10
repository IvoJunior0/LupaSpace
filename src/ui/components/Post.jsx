import React from 'react'
import { useEffect, useState } from 'react';

import { collection, doc, getDoc } from "firebase/firestore";

import { db } from '../../config/firebase';
import { onSnapshot } from 'firebase/firestore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as likeActive, faThumbsDown as dislikeActive, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as likeDesactive, faThumbsDown as dislikeDesactive } from '@fortawesome/free-regular-svg-icons';

import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link } from 'react-router-dom';

export default function Post(props) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [likeIcon, setLikeIcon] = useState();
    const [dislikeIcon, setDislikeIcon] = useState();
    let timeAgo;
    const post = props.post;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'Users', post.userId));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    console.log("Usuário não encontrado");
                }
            } catch (err) {
                console.log('Erro ao buscar dados do usuário');
            } finally {
                setLoading(false);
            }
          };
          fetchUserData();
    }, [post.userId, post.createdAt]);

    const handleLike = () => {
        
    }

    if (!loading) {
        const convertedDate = new Date(post.createdAt.seconds * 1000);
        timeAgo = formatDistanceToNow(convertedDate, { includeSeconds: true, locale: ptBR });
    }

    return (
        <div className='flex flex-col gap-6 text-gray-500'>
            <hr/>
            <div className="py-4 px-6 hover:bg-slate-50 hover:border-gray-300 border-2 border-transparent rounded-md">
                {loading ? <h1>Carregando informações...</h1> : (<>
                    {!post.pfp ? (<h6><FontAwesomeIcon icon={faCircleUser}/></h6>) : (<h6>{post.pfp}</h6>)}
                    <h6><Link to={`/user/${post.userId}`}>{userData.name} - @{userData.username}</Link> - há {timeAgo}</h6>
                    <h2>{post.titulo}</h2>
                    <p>{post.descricao}</p>
                    <h4><button onClick={handleLike}><FontAwesomeIcon icon={likeDesactive} /></button> {post.likes} <button><FontAwesomeIcon icon={dislikeDesactive} /></button> {post.dislikes}</h4>
                </>)
                }
            </div>
        </div>
    );
}