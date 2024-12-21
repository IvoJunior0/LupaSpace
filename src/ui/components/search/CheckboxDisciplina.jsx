/**
 * Componente checkbox das disciplinas (tags).
 * Usado no SearchPage.jsx
 * 
 * @param {Object} param0 - props
 * @param {Function} param0.updateDisciplinas - função para atualizar o array com todas as disciplinas
 * @param {string} param0.id - valor usado para identificar a disciplina
 * @param {string} param0.text - nome da disciplina
 * 
 * @returns {JSX.Element} - Componente renderizado.
 */
export default function CheckboxDisciplina({ updateDisciplinas, id, text }) {
    return (
        <div>
            <input type="checkbox" id={id} value={id} onChange={updateDisciplinas} />
            <label htmlFor={id}>{text}</label>
        </div>
    );
}