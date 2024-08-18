import React from 'react'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

function FilterButton({ selectedFilters, setSelectedFilters }) {
    const [open, setOpen] = useState(false);
    const [chevron, setChevron] = useState(false);

    function handleOpen () {
        setOpen(!open);
        setChevron(!chevron);
    };

    const handleCheckboxChange = (tag) => {
        if (selectedFilters.includes(tag)) {
            setSelectedFilters(selectedFilters.filter(t => t !== tag));
        } else {
            setSelectedFilters([...selectedFilters, tag]);
        }
    };

    return (
        <div className='my-5'>
            <button className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600' onClick={handleOpen}>
                Filtrar por {chevron ? <FontAwesomeIcon icon={faChevronUp}/> : <FontAwesomeIcon icon={faChevronDown}/>}
            </button>
            {open ? <div className='bg-gray-400 max-w-56 text-white px-4 py-2 rounded shadow-md'>
                        <ul>
                            <li className="flex items-center gap-1">
                                <input type="checkbox" checked={selectedFilters.includes("DB")} onChange={() => handleCheckboxChange("DB")} className="accent-green-600 p-2 w-4 h-4 rounded outline-none"></input>
                                <label>Banco de Dados</label>
                            </li>
                            <li>
                                <input type="checkbox"></input>
                                <label>Desenvolvimento Web</label>
                            </li>
                            <li>
                                <input type="checkbox"></input>
                                <label>Informática Básica</label>
                            </li>
                            <li>
                                <input type="checkbox"></input>
                                <label>Lógica de programação</label>
                            </li>
                            <li>
                                <input type="checkbox"></input>
                                <label>POO</label>
                            </li>
                            <li>
                                <input type="checkbox"></input>
                                <label>Redes de Computadores</label>
                            </li>
                        </ul>
                    </div> : null}
        </div>

    )
}

export default FilterButton