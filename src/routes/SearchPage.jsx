import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import CheckboxDisciplina from "../ui/components/search/CheckboxDisciplina.jsx";

/**
 * Gerador de palavras-chave para o sistema de busca
 * (uso específico parar os posts)
 * 
 * @param {*} titulo titulo do projeto
 * @param {*} descricao descrição do projeto
 */
const generateKeywords = (titulo, descricao) => {
    const keywords = [];
    const stopWords = /\b(o|a|os|cada|as|um|uma|uns|umas|de|da|do|das|dos|para|por|pelo|pela|em|no|na|nos|nas|com|sem|sobre|sob|entre|até|desde|e|ou|mas|então|logo|pois|porque|porquê|que|como|quando|onde|eu|tu|ele|ela|nós|vós|eles|elas|meu|minha|seus|suas|nosso|nossa|isso|aquilo|fazer|ter|ser|estar|haver|ou|de|a|o|que|e|do|da|em|um|para|com|não|uma|os|no|se|na|por|mais|as|dos|como|mas|ao|ele|das|tem|à|seu|sua|ou|quando|muito|nos|já|está|eu|também|só|pelo|pela|até|isso|ela|entre|era|depois|sem|mesmo|aos|ter|seus|quem|nas|me|esse|eles|estão|você|tinha|foram|essa|num|nem|suas|meu|às|minha|têm|numa|pelos|elas|havia|seja|qual|nós|lhe|deles|essas|esses|pelas|este|fosse|dele|tu|te|vocês|vos|lhes|meus|minhas|teu|tua|teus|tuas|nosso|nossa|nossos|nossas|dela|delas|esta|estes|estas|aquele|aquela|aqueles|aquelas|isto|aquilo|estou|está|estamos|estão|estive|esteve|estivemos|estiveram|estava|estávamos|estavam|estivera|estivéramos|esteja|estejamos|estejam|estivesse|estivéssemos|estivessem|estiver|estivermos|estiverem|hei|há|havemos|hão|houve|houvemos|houveram|houvera|houvéramos|haja|hajamos|hajam|houvesse|houvéssemos|houvessem|houver|houvermos|houverem|houverei|houverá|houveremos|houverão|houveria|houveríamos|houveriam|sou|somos|são|era|éramos|eram|fui|foi|fomos|foram|fora|fôramos|seja|sejamos|sejam|fosse|fôssemos|fossem|for|formos|forem|serei|será|seremos|serão|seria|seríamos|seriam|tenho|tem|temos|tém|tinha|tínhamos|tinham|tive|teve|tivemos|tiveram|tivera|tivéramos|tenha|tenhamos|tenham|tivesse|tivéssemos|tivessem|tiver|tivermos|tiverem|terei|terá|teremos|terão|teria|teríamos|teriam)\b|[.,;:!?'"*/()[\]{}=+<>$%&@#^~|-]/gi;

    // Separando cada palavra em um array
    const tituloWords = titulo.toLowerCase().split(" ");
    const descricaoWords = descricao.toLowerCase().split(" ");

    // Retirando palavras desnecessárias
    tituloWords.forEach((word) => keywords.push(word));
    descricaoWords.forEach((word) => keywords.push(word));

    const removeStopWords = (texto) => texto.replace(stopWords, ''); // Função pra tirar as stop words
    const removedStopWords = keywords.map(removeStopWords);
    const removedDuplicates = [...new Set(removedStopWords)];
    
    // console.log(keywords);
    // console.log(removedDuplicates);
    // TODO: lidar com espaços em brancos que sobrou ("") e acentos
}

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

    // generateKeywords("Cálculo de XP necessário para cada nível", "Código simples em python feito para descobrir quantos pontos de experiência (XP) serão necessários para chegar em certo nível, considerando um XP inicial.")

    const inputClassname = "transition-colors text-slate-500 px-5 py-3 border-[3px] rounded focus:outline-none focus:border-slate-400";

    document.title = "Filtro de pesquisa";

    // Resetar os valores dos campos de pesquisa
    const resetValues = () => {
        setQueryText("");
        setQueryType(0);
        setDisciplinas([]);
        setTurma(0);
    }

    console.log(disciplinas);

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
            // TODO: outra rota
            navigate(`busca?q=${queryText}&type=${queryType}&info=${turma}${queryType === "projetos" ? `&tag=${disciplinas}` : ``}`); // TODO: passar os parametros CORRETOS dps
            resetValues();
        }
    }

    if (location.pathname !== "/pesquisa" ) {
        return (<Outlet/>);
    }

    // TODO: fazer com que quando a opção aluno for selecionada, as opções de disciplinas sejam desabilitadas, tiradas da lista e
    // TODO: componentização dos inputs e checkboxes
    return (
        <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2 text-gray-500">
            <div className="flex flex-col gap-3">
                <h1 className="sm:text-4xl text-2xl font-semibold">Formulário de pesquisa</h1>
                <p className="text-base">Selecione os filtros e digite o que está procurando no site.</p>
            </div>
            <div className="py-3 flex flex-col gap-3.5">
                <h2 className="text-xl">Pesquisa por filtros</h2>
                <div className="flex flex-wrap gap-2.5 justify-between w-full">
                    {/* TAGS (DISCIPLINAS) */}
                    <div className="min-w-80" id="checkboxes">
                        <h4>Disciplina</h4>
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="lp" text="Lógica de Programação" disabled={isDisabled} />
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="poo" text="Programação Orientada a Objetos" disabled={isDisabled} />
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="web" text="Desenvolvimento Web" disabled={isDisabled} />
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="db" text="Banco de Dados" disabled={isDisabled} />
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="redes" text="Redes de Computadores" disabled={isDisabled} />
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="hardware" text="Hardware" disabled={isDisabled} />
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="info" text="Informática Básica" disabled={isDisabled} />
                        <CheckboxDisciplina updateDisciplinas={updateDisciplinas} id="tcc" text="Artigo" disabled={isDisabled} />
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
                            <input type="radio" id="project" name="queryType" onChange={() => {setQueryType("projetos"); resetValues(); setIsDisabled(true)}} />
                            <label htmlFor="project">Projeto</label>
                        </div>
                        <div>
                            <input type="radio" id="user" name="queryType" onChange={() => {setQueryType("alunos"); resetValues(); setIsDisabled(false)}}/>
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