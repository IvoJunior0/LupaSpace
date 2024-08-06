import React from 'react'
import { useEffect, useState } from 'react';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../../config/firebase';

import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function Post(props) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
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

    if (!loading) {
        const convertedDate = new Date(post.createdAt.seconds * 1000);
        timeAgo = formatDistanceToNow(convertedDate, { includeSeconds: true, locale: ptBR });
    }

    return (
        <div className=''>
            {loading ? <h1>Carregando informações...</h1> : (<>
                <h6>{userData.name} - @{userData.username} - há {timeAgo}</h6>
                <h2>{post.titulo}</h2>
                <p>{post.descricao}</p>
            </>)
            }
        </div>
    );
}