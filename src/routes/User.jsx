// Hooks
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";

// Componentes
import Loading from '../ui/components/extras/Loading';
import calculateUserLvl from '../functions/calculateUserLvl';

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

import { Outlet } from 'react-router-dom';
import ProjectsContainer from '../ui/components/user/ProjectsContainer';

/**
 * Retorna a quantidade total de exp necessario
 * para upar de nível.
 * 
 * @param {number} proximoNivel Nível desejado
 * @returns {number} Total de xp do nível atual
 */
const xpNecessario = (proximoNivel) => {
    const xp = (6/5) * Math.pow(proximoNivel, 3) - 15 * Math.pow(proximoNivel, 2) + 100 * proximoNivel - 140;
    return Math.trunc(xp);
}

/**
 * Página de perfil do usuário.
 * 
 * @returns {JSX.Element} Componente renderizado.
 */
export default function User() {
    const { uid } = useParams(); // id do usuário.
    const location = useLocation(); // URL.

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userLvl, setUserlvl] = useState(0);

    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'Users', uid));

                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    console.log('Usuário não encontrado'); // TODO: resposta visual
                }
                setLoading(false);
            } catch (error) {
                console.log(error); // TODO: resposta visual
            }
        };
        fetchUserData();
    }, [uid]);

    useEffect(() => {
        if (userData) {
            setUserlvl(calculateUserLvl(userData.xp));
        }
    }, [userData]);

    // É falso quando está na página de algum projeto de usuário.
    const isParentRoute = location.pathname === `/user/${uid}`;

    useEffect(() => {
        if (!userData && !loading) {
            return (
                <div className="mt-[90px] mb-[24px] w-full h-fit col-end-2 max-[1199px]:col-span-full col-start-2">
                    <h1>Usuário não encontrado</h1>
                </div>
            )
        }

        /**
         * Trocando o título da página somente quando o objeto userData existir de fato.
         * O else nao funciona nesse caso. Ele retorna undefined primeiro e depois que troca pelo valor da variável.
         * 
         * @example
         * document.title = "Usuário X - @username_x";
         */
        if (userData) {
            document.title = `${userData?.name} - @${userData.username}`;
        }
    }, [userData, loading]);

    return (
        <div className="mt-[90px] mb-[24px] w-full h-fit col-end-2 max-[1199px]:col-span-full col-start-2">
            {loading ? <Loading /> : (<>
                {/* Cabeçalho */}
                <section className="flex items-center justify-around w-full bg-green-800 p-3">
                    {/* Foto de perfil */}
                    <h2 className=''>
                        {!userData.pfp ? (
                            <FontAwesomeIcon icon={faCircleUser} className='text-7xl text-green-500 border-4 border-white rounded-full' />
                        ) : userData.pfp}
                    </h2>
                    {/* Nome e username */}
                    <div className="text-white">
                        <h2 className='font-bold'>{userData.name}</h2>
                        <h2>@{userData.username}</h2>
                    </div>
                    {/* Botão de seguir */}
                    <div className="">
                        {uid === user.uid ? null : 
                            // TODO: trocar pelo componente do botão de seguir
                            <button className='bg-green-500 text-white py-1.5 px-3.5 rounded'>Seguir +</button>
                        }
                    </div>
                </section>
                {/* Informações */}
                <section className='flex flex-col gap-2.5 p-6 text-gray-500'>
                    {isParentRoute ? (<>
                        <div className="grid md:grid-cols-2 md:grid-rows-1 gap-2.5 grid-cols-1 grid-rows-2 place-items-center">
                            {/* Biografia */}
                            <p className='md:w-full'>{userData.bio}</p>
                            {/* Contatos */}
                            <div className="flex items-center gap-2 md:w-full md:justify-end">
                                {/* O .trunc tira a parte decimal do nível */}
                                <div className="border-green-500 border-[3px] p-5 w-3 h-3 rounded-full flex justify-center items-center bg-green-50">
                                    <span className="font-bold text-green-700">{Math.trunc(userLvl)}</span>
                                </div>
                                {/*
                                { (userData && userLvl) ? 
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className={`bg-blue-600 h-2.5 rounded-full w-[${}%]`}/>
                                </div> : null
                                } */}
                                <progress className='[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-green-400' value={userLvl - Math.trunc(userLvl)}/>
                                <span>{`(${userData.xp} / ${xpNecessario(Math.trunc(userLvl) + 1)}) EXP`}</span>
                            </div>
                        </div>
                        <hr className='border-2'/>
                        {/* Projetos */}
                        <div className="">
                            <h1 className='text-3xl font-bold'>Projetos</h1>
                            <ProjectsContainer userId={uid}/>
                        </div>
                    </>) : 
                    <Outlet />}
                </section>
            </>)}
        </div>
    );
}