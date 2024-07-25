import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function CreatePost(props) {
    return(
        <div className={`top-0 left-0 flex justify-center backdrop-brightness-50 backdrop-blur-[1.5px] w-full h-full ${(props.trigger) ? 'fixed' : 'hidden'}`}>
            <div className="flex flex-col gap-5 w-[100%] h-[480px] p-8 max-w-3xl mx-4 bg-slate-50 text-gray-500 self-center rounded-xl border-4 border-gray-300 shadow-lg">
                <div className="flex justify-between">
                    <h1 className="sm:text-4xl text-3xl font-semibold">Criar Postagem</h1>
                    <button onClick={() => props.setTrigger(false)}><FontAwesomeIcon icon={faXmark} className="text-2xl"/></button>
                </div>
                <div>
                    <label className="block text-xl">Título</label>
                    <input type="text" placeholder="Insira o título aqui" className="block w-full p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400" id="titulo"/>
                </div>
                <div>
                    <label className="block">Descrição</label>
                    <textarea className="block resize-none block w-full p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400" id="descricao" placeholder="Descreva sua postagem aqui"></textarea>
                </div>
                <div>
                    <div class="space-y-8 max-w-md mx-auto my-5">
                        <input type="file"
                            className="w-full text-gray-500 font-medium text-sm bg-slate-100 border-slate-300 border-2 rounded-md file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="bg-green-600 text-slate-50 py-3 px-8 rounded hover:bg-green-500">Postar</button>
                </div>
            </div>
        </div>
    );
}