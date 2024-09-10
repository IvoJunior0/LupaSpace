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

    if (!userData) {
      return <div>Usuário não encontrado</div>;
    } else {
      document.title = userData.name;
    }

    return(
        <div className='grid grid-rows-[90px_1fr] grid-cols-[320px_1fr] mx-lg:grid-cols-1 h-[100vh]'>
            <Navbar/>
            <Sidebar/>
            <div className="mt-[90px] mb-[24px] w-full h-fit col-end-2 max-[1199px]:col-span-full col-start-2">
              <div className="h-40 w-full relative">
                <div className="bg-green-500 h-32 w-full relative" />
                <div className="flex justify-around items-end absolute bottom-0 left-0 w-full text-gray-500">
                  <h2 className='relative z-20'>
                    {!userData.pfp ? (
                      <FontAwesomeIcon icon={faCircleUser} className='text-6xl text-green-500 border-4 border-white rounded-full'/>
                    ) : userData.pfp}
                  </h2>
                  <div className="">
                    <h2>{userData.name}</h2>
                    <h2>@{userData.username}</h2>
                  </div>
                  <button>Seguir +</button>
                </div>
              </div>
            </div>
        </div>
    );
}