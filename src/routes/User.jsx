import React, { useEffect, useState } from 'react';

// Componentes
import { useParams } from "react-router-dom";
import Navbar from "../ui/components/header/Navbar";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      return <div>Carregando...</div>;
    }

    if (!userData) {
      return <div>Usuário não encontrado</div>;
    } else {
      document.title = userData.name;
    }

    return(
        <div>
            <Navbar/>
            <h2>Nome: {userData.name}</h2>
            <h2>Email: {userData.email}</h2>
            <h2>Username: {userData.username}</h2>
        </div>
    );
}