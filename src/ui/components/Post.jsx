import React from 'react'
import { useEffect, useState } from 'react';
import File from './Posts/File';

import { collection, doc, getDoc } from "firebase/firestore";

import { db } from '../../config/firebase';
import { onSnapshot } from 'firebase/firestore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as likeActive, faThumbsDown as dislikeActive, faHeart as postFavoritedIcon, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as likeDesactive, faThumbsDown as dislikeDesactive, faHeart as notFavoritedIcon } from '@fortawesome/free-regular-svg-icons';

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
            <div className="grid grid-cols-[auto_250px] grid-rows-[1fr_auto_auto_auto] py-4 px-6 gap-3 border-2 border-transparent rounded-md hover:bg-slate-50 hover:border-gray-300 items-center">
                {loading ? <h1>Carregando informações...</h1> : (<>
                    <div className='col-span-1 grid grid-cols-[auto_1fr] grid-rows-2 gap-0'>
                        {!post.pfp ? (<h6 className='row-span-2 self-center'><FontAwesomeIcon icon={faCircleUser} className='text-5xl'/></h6>) : (<h6>{post.pfp}</h6>)}
                        <h6 className='col-start-2 row-start-1 pl-3 text-xl'><Link to={`/user/${post.userId}`}>{userData.name}</Link></h6>
                        <h6 className='col-start-2 row-start-2 pl-3 text-sm'>Há {timeAgo}</h6>
                    </div>
                    <div className="col-start-1 row-start-2">
                        <h2 className='text-2xl font-medium hover:font-bold'>{post.titulo}</h2>
                    </div>
                    <div className="col-start-1 row-start-3">
                        <p>{post.descricao}</p>
                    </div>
                    <div className="col-start-1 row-start-4">
                        <p>Tags, tags, tags,</p>
                    </div>
                    <div className="row-span-3 col-start-2 row-start-1">
                        <File></File>
                    </div>
                    <div className="flex items-start justify-center gap-2">
                        <button onClick={handleLike}><FontAwesomeIcon icon={likeDesactive} /></button>
                        {post.likes}
                        <button><FontAwesomeIcon icon={dislikeDesactive} /></button>
                        {post.dislikes}
                        <button> <FontAwesomeIcon icon={notFavoritedIcon} /> </button>
                    </div>
                </>)
                }
            </div>
        </div>
    );
}