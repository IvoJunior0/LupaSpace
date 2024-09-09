export default function CreateTopicPage() {
    return(
        <>
            <hr className="border-t-2"/>
            <form className="flex flex-col gap-5 text-gray-500">
                <div>
                    <h1 className="text-xl">Criar novo tópico</h1>
                </div>
                <div className="">
                    <label className="block">Título</label>
                    <input type="text" placeholder="Título do tópico" className="block w-full p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400"/>
                </div>
                <div className="">
                    <label className="block">Conteúdo</label>
                    <textarea name="" id="" placeholder="Conteúdo do tópico" className="block resize-none w-full min-h-44 p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400"/>
                </div>
                <div className="">
                    <button type="submit" className="text-white py-2 px-4 bg-green-600 hover:bg-green-500">Publicar</button>
                </div>
            </form>
        </>
    )
}