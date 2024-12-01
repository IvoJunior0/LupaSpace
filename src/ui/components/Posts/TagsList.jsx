import Tag from "./Tag";

/**
 * Componente container que mostra todas as tags de um projeto.
 * 
 * @param {Array} list Lista de tags.
 * 
 * @returns {JSX.Element} Componente div em forma de lista com todas as tags do post.
 */
export default function TagsList({ list }) {
    return (
        <div className="flex items-center flex-wrap gap-2 py-3 sm:p-0">
            {list?.map((tag, index) => (
                <div key={index}>
                    <Tag tagName={tag} />
                </div>
            ))}
        </div>
    );
}