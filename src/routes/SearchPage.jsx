import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CheckboxDisciplina from "../ui/components/search/CheckboxDisciplina.jsx";

// TODO: colocar a barra de navegação
/**
 * Página de formulário para pesquisa de projetos ou alunos.
 * 
 * @returns {JSX.Element} Componente renderizado.
 */
export default function SearchPage() {
    const [queryText, setQueryText] = useState("");
    const [disciplinas, setDisciplinas] = useState([]);
    const [turma, setTurma] = useState(0);
    const [queryType, setQueryType] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const inputClassname = "transition-colors text-slate-500 px-5 py-3 border-[3px] rounded focus:outline-none focus:border-slate-400";

    document.title = "Filtro de pesquisa";

    // Resetar os valores dos campos de pesquisa
    const resetValues = () => {
        setQueryText("");
        setDisciplinas([]);
        setTurma(0);
    }

    const uncheckTags = () => {

    }

    // Atualizar o texto de pesquisa quando input text mudar
    const changeQueryText = (e) => {
        setQueryText(e.target.value);
    }

    // Atualizar a lista de disciplinas
    const updateDisciplinas = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setDisciplinas(d => [...d, value]);
        } else { // Retirando o item do array quando desmarcado
            setDisciplinas(d => d.filter((item) => item !== value));
        }
    }

    const handleSubmit = () => {
        // Nenhum campo preenchido
        if (queryText === "" || queryType === 0 || disciplinas == [] || turma === 0) {
            console.log("NENHUM campo preenchido"); // TODO: resposta visual
        } else {
            navigate(`busca?q=${queryText}&type=${queryType}&info=${turma}${queryType === "projetos" ? `&tag=${disciplinas}` : ``}`);
            resetValues();
        }
    }

    console.log(queryText, disciplinas, turma, queryType);

    if (location.pathname !== "/pesquisa" ) {
        return (
            <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2 text-gray-500">
                <Outlet/>
            </div>
        );
    }

    return (
        <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2 text-gray-500">
            <div className="flex flex-col gap-3">
                <h1 className="sm:text-4xl text-2xl font-semibold">Formulário de pesquisa</h1>
                <p className="text-base">Selecione os filtros e digite o que está procurando no site.</p>
            </div>
            <div className="py-3 flex flex-col gap-3.5">
                <h2 className="text-xl">Pesquisa por filtros</h2>
                <hr />
                <div className="flex flex-wrap gap-2.5 justify-between w-full">
                    {/* TAGS (DISCIPLINAS) */}
                    <div className="min-w-80" id="checkboxes">
                        <h4>Disciplina</h4>
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="lp" text="Lógica de Programação" disabled={isDisabled}/>
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="poo" text="Programação Orientada a Objetos" disabled={isDisabled}/>
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="web" text="Desenvolvimento Web" disabled={isDisabled}/>
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="db" text="Banco de Dados" disabled={isDisabled}/>
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="redes" text="Redes de Computadores" disabled={isDisabled}/>
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="hardware" text="Hardware" disabled={isDisabled}/>
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="info" text="Informática Básica" disabled={isDisabled}/>
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="tcc" text="Artigo" disabled={isDisabled}/>
                    </div>
                    {/* TURMA */}
                    <div className="min-w-80">
                        {/* Cada input radio define um novo valor em turma (1, 2 ou 3) */}
                        <h4>Turma</h4>
                        <div>
                            <input type="radio" id="1" onChange={() => setTurma(1)} name="turma"/>
                            <label htmlFor="1">Informática 1</label>
                        </div>
                        <div>
                            <input type="radio" id="2" onChange={() => setTurma(2)} name="turma"/>
                            <label htmlFor="2">Informática 2</label>
                        </div>
                        <div>
                            <input type="radio" id="3" onChange={() => setTurma(3)} name="turma"/>
                            <label htmlFor="3">Informática 3</label>
                        </div>
                    </div>
                    {/* TIPO DE PESQUISA */}
                    <div className="min-w-80">
                        <h4>Tipo de pesquisa</h4>
                        <div>
                            <input type="radio" id="project" name="queryType" onChange={() => {setQueryType("projetos"); setIsDisabled(false)}} />
                            <label htmlFor="project">Projeto</label>
                        </div>
                        <div>
                            <input type="radio" id="user" name="queryType" onChange={() => {setQueryType("alunos"); setIsDisabled(true)}}/>
                            <label htmlFor="user">Aluno</label>
                        </div>
                    </div>
                </div>
                {/* TEXTO DE PESQUISA */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="texto">Digite o que está procurando</label>
                    <input className={inputClassname} id="texto" placeholder="Insira o texto..." type="text" name="title" onChange={changeQueryText} />
                </div>
                {/* BOTÃO SUBMIT */}
                <div className="place-self-end">
                    <button className="px-3.5 py-2.5 rounded bg-green-600 text-white transition-all duration-200 hover:bg-green-800" onClick={handleSubmit}>Pesquisar</button>
                </div>
            </div>
        </div>
    );
}