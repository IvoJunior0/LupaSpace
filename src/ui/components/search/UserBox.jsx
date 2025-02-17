import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function UserBox({ props }) {
    console.log(props)
    return (
        <div className="p-4 rounded-md border-2 border-slate-300 flex justify-between">
            <div className="flex">
                <div className="justify-items-center">
                    <FontAwesomeIcon icon={faCircleUser} className="text-5xl" />
                    <h2>{props.name}</h2>
                    <h2>@{props.username}</h2>
                </div>
                <div className="flex flex-col">
                    <p className="break-words">{props.bio}</p>
                    <span>Informática {props.turma}</span>
                </div>
            </div>
            <div className="">
                <div className="">
                    {/* TODO: trocar pelo componente do botão de seguir */}
                    <button className='bg-green-500 text-white py-1.5 px-3.5 rounded'>+</button>
                </div>
            </div>
        </div>
    )
}