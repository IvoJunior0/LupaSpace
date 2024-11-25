import { useEffect, useState } from "react";

import Loading from "../extras/Loading";
import Project from "../Project";

import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import ProjectBox from "./ProjectBox";

/**
 * Container que lista todos os projetos do usuário na sua página.
 * 
 * @param {Object} props Props passada com um atributo.
 * @param {String} userId Id do usuário.
 * 
 * @returns {JSX.Element} Componente renderizado.
 */
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
                <ul className='flex flex-col gap-6 py-4'>
                    {userProjects.map(post => (
                        <li key={post.id}>
                            <ProjectBox post={post} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}