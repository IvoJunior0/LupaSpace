/**
 * Componente para modelo de título de páginas.
 * 
 * @param {Object} props Objeto da props.
 * @param {string} props.text Texto do título.
 * 
 * @returns {JSX.Element} Componente renderizado.
 */
export default function TitlePage({ text }) {
    return(
        <div className="sm:text-3xl text-2xl text-gray-500 font-semibold">
            <h1>{text}</h1>
        </div>
    )
}