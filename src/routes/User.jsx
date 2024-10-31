// Hooks
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

// Componentes
import Navbar from "../ui/components/header/Navbar";
import Loading from '../ui/components/extras/Loading';
import Sidebar from '../ui/components/home/Sidebar';

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function User() {
    const { uid } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const userDoc = await getDoc(doc(db, 'Users', uid));
            
            if (userDoc.exists()) {
                setUserData(userDoc.data());
            } else {
                console.log('Usuário não encontrado');
            }
            setLoading(false);
        };
    
        fetchUserData();
    }, [uid]);

    if (loading) {
        return (
            <div className="h-screen w-screen">
                <Loading/>
            </div>
        );
    }

    console.log(userData)

    if (!userData) {
        return <div>Usuário não encontrado</div>;
    } else {
        document.title = `${userData.name} (@${userData.username}) | LupaSpace`;
    }

    return(
        <div className='grid grid-rows-[90px_1fr] grid-cols-[320px_1fr] mx-lg:grid-cols-1 h-[100vh]'>
            <Navbar/>
            <Sidebar/>
            <div className="mt-[90px] mb-[24px] w-full h-fit col-end-2 max-[1199px]:col-span-full col-start-2">
                {/* Cabeçalho */}
                <section className="flex items-center justify-around w-full bg-green-800 p-3">
                    <h2 className=''>
                        {!userData.pfp ? (
                            <FontAwesomeIcon icon={faCircleUser} className='text-7xl text-green-500 border-4 border-white rounded-full'/>
                        ) : userData.pfp}
                    </h2>
                    <div className="text-white">
                        <h2 className='font-bold'>{userData.name}</h2>
                        <h2>@{userData.username}</h2>
                    </div>
                    <div className="">
                        <button className='bg-green-500 text-white py-1.5 px-3.5 rounded'>Seguir +</button>
                    </div>
                </section>
                {/* Informações */}
                <section>
                    
                </section>
            </div>
        </div>
    );
}