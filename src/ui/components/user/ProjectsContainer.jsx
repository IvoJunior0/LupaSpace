import { useEffect, useState } from "react";

import Loading from "../extras/Loading";
import Project from "../Project";

import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function ProjectsContainer({ userId }) {
    const [userProjects, setUserProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                const projectPath = `Users/${userId}/Projects`;

                const projectsRef = collection(db, projectPath);
                const projectsSnapshot = await getDocs(projectsRef);
                const projects = projectsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                console.log(projects);
                setUserProjects(projects);
                setLoading(false);

            } catch (error) {
                console.log("ERRO: " + error) // TODO: resposta visual
            }
        }

        fetchUserProjects();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="">
            {userProjects.length === 0 ? (
                loading ? <p>Carregando...</p> : <p>Nenhum post encontrado.</p>
            ) : (
                <ul className='flex flex-col gap-6'>
                    {userProjects.map(post => (
                        <li key={post.id}>
                            {post.id}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}