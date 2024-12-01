import { useState } from "react";

export default function SearchPage() {
    const [projectTitle, setProjectTitle] = useState("");
    const [username, setUsername] = useState("");
    const [tags, setTags] = useState([]);
    const [turma, setTurma] = useState(0); // 1, 2 ou 3

    document.title = "Filtro de pesquisa";

    const inputClassname = "transition-colors text-slate-500 px-5 py-3 border-[3px] rounded focus:outline-none focus:border-slate-400";

    // TODO: componentização das checkbox
    return (
        <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2 text-gray-500">
            <div className="flex flex-col gap-3">
                <h1 className="sm:text-4xl text-2xl font-semibold">Formulário de pesquisa</h1>
                <p className="text-xl">Selecione os filtros e digite o que está procurando no site. <b>É obrigatório selecionar pelo menos o filtro de Projetos ou Alunos</b>.</p>
            </div>
            <form action="">
                <h1>Pesquisa por filtros</h1>
                <div className="">
                    <h4>Disciplinas</h4>
                    <input type="checkbox" id="lp" />
                    <label htmlFor="lp">Lógica de Programação</label>
                    <input type="checkbox" id="poo" />
                    <label htmlFor="poo">Programação Orientada a Objetos</label>
                    <input type="checkbox" id="web" />
                    <label htmlFor="web">Desenvolvimento Web</label>
                    <input type="checkbox" id="db" />
                    <label htmlFor="db">Banco de Dados</label>
                </div>
                <div className="">
                    <h4>Turma</h4>
                    <input type="checkbox" id="1" />
                    <label htmlFor="1">Informática 1</label>
                    <input type="checkbox" id="2" />
                    <label htmlFor="2">Informática 2</label>
                    <input type="checkbox" id="3" />
                    <label htmlFor="3">Informática 3</label>
                </div>
                <div className="">
                    <h4>Tipo</h4>
                    <input type="checkbox" id="project" />
                    <label htmlFor="project">Projeto</label>
                    <input type="checkbox" id="user" />
                    <label htmlFor="user">Aluno</label>
                    {/* Aluno ou projeto */}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="texto">Digite o que está procurando</label>
                    <input className={inputClassname} id="texto" placeholder="Insira o texto..." type="text" name="title" />
                </div>
            </form>
        </div>
    );
}