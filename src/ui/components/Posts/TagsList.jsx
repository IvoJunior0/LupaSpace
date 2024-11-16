import Tag from "./Tag";

/**
 * Componente container que mostra todas as tags de um projeto.
 * @param {Array} list Lista de tags.
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