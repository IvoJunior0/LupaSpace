import { useEffect, useState } from "react";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

import Loading from "../extras/Loading";

export default function TopicsBlock({ path, ids }) {
    const [data, setData] = useState([]);
    const [topicsList, setTopicsList] = useState([]);
    const [loading, setLoading] = useState(true);
    let timeAgo;

    useEffect(() => {
        const fetchForums = async () => {
            try {
                // Mudar depois todo o jeito de dar um fetch nos posts recentes porque esse tá uma merda
                const allData = [];
                for (const item in ids) {
                    const topicsSnapshot = await getDocs(collection(db, `${path}${ids[item]}/Topics`));                    
                    const dataList = topicsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    allData.push(...dataList);
                }
                // Depois que coletou todos os topicos
                const AllDataSorted = allData.sort((a, b) => {
                    return b.createdAt - a.createdAt; // Arrumar isso dps
                })
                setData(AllDataSorted);
                setLoading(false);
            } catch (error) {
                console.log("Erro: ", error);   
            }
        };
        fetchForums();
    }, [path, ids]);

    if (loading) return <Loading/>;
 
    return(
        <>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </>
    );
}