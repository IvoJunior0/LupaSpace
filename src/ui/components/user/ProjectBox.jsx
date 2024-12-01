import parse from 'html-react-parser';

import { Link } from 'react-router-dom';

/**
 * Projetos que aparecem na página do usuário.
 * 
 * @param {Object} props Props do componente.
 * @param {Object} post Objeto com informações do post.
 * 
 * @returns {JSX.Element} Componente renderizado.
 */
export default function ProjectBox({ post }) {
    return (
        <div className="p-4 border-4 border-slate-200 rounded-md hover:border-slate-400 hover:bg-slate-100">
            <Link to={`projetos/${post.id}`} >
                <h1 className="text-xl font-semibold">{post.titulo}</h1>
                <p>{parse(post.descricao)}</p>
            </Link>
        </div>
    );
}