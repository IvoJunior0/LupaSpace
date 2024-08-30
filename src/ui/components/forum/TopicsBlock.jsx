import { doc, getDocs, collection, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import Loading from "../extras/Loading";

export default function TopicsBlock({ path, ids }) {
    const [data, setData] = useState([]);
    const [topicsList, setTopicsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const allData = [];
                for (const item in ids) {
                    const topicsSnapshot = await getDocs(collection(db, `${path}${ids[item]}/Topics`));                    
                    const dataList = topicsSnapshot.docs.map(doc => ({
                        id: item,
                        ...doc.data()
                    }));
                    console.log(dataList);
                    allData.push(...dataList);
                }
                setData(allData);
                console.log(allData);
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