// Hooks
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";

// Componentes
import Navbar from "../ui/components/header/Navbar";
import Loading from '../ui/components/extras/Loading';
import Sidebar from '../ui/components/home/Sidebar';

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

import { Outlet } from 'react-router-dom';
import ProjectsContainer from '../ui/components/user/ProjectsContainer';

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

    // Atual usuário
    const user = auth.currentUser;

    // Coletando os dados do usuário e colocando no userData.
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'Users', uid));

                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    console.log('Usuário não encontrado');
                }
                setLoading(false);
            } catch (error) {
                console.log(error); // TODO: resposta visual
            }
        };
        fetchUserData();
    }, [uid]);

    // É falso quando está na página de algum projeto de usuário.
    const isParentRoute = location.pathname === `/user/${uid}`;

    // Mudando o título da página e dando mensagem de erro.
    useEffect(() => {
        // Retornar erro visual se o usuário não for encontrado
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
                        <div className="grid grid-cols-2 grid-rows-1">
                            {/* Biografia */}
                            <p>{userData.bio}</p>
                            {/* Contatos */}
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