import React, { useEffect, useState } from 'react';

// Componentes
import { useParams } from "react-router-dom";
import Navbar from "../ui/components/header/Navbar";
import Loading from '../ui/components/extras/Loading';

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Sidebar from '../ui/components/home/Sidebar';

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
            <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2">
              <h2>Nome: {userData.name}</h2>
              <h2>Email: {userData.email}</h2>
              <h2>Username: {userData.username}</h2>
            </div>
        </div>
    );
}