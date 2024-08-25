import React from 'react'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import TagSelector from '../Posts/TagSelector';

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
            setSelectedFilters(s => [...s, tag]);
        }
    };

    return (
        <div className='my-5'>
            <button className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600' onClick={handleOpen}>
                Filtrar por {chevron ? <FontAwesomeIcon icon={faChevronUp}/> : <FontAwesomeIcon icon={faChevronDown}/>}
            </button>
            {open ? <div className='bg-gray-400 max-w-72 text-white px-4 py-2 rounded shadow-md'>
                        <ul>
                            <TagSelector handleCheckboxChange={handleCheckboxChange} id={"db"} tag={"Banco de Dados"}/>
                            <TagSelector handleCheckboxChange={handleCheckboxChange} id={"web"} tag={"Desenvolvimento Web"}/>
                            <TagSelector handleCheckboxChange={handleCheckboxChange} id={"hardware"} tag={"Hardware"}/>
                            <TagSelector handleCheckboxChange={handleCheckboxChange} id={"info"} tag={"Informática Básica"}/>
                            <TagSelector handleCheckboxChange={handleCheckboxChange} id={"lp"} tag={"Lógica de Programação"}/>
                            <TagSelector handleCheckboxChange={handleCheckboxChange} id={"poo"} tag={"Programação Orientada a Objetos"}/>
                            <TagSelector handleCheckboxChange={handleCheckboxChange} id={"redes"} tag={"Redes de Computadores"}/>
                        </ul>
                    </div> : null}
        </div>

    )
}

export default FilterButton