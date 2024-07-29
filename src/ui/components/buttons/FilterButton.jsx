import React from 'react'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

function FilterButton() {
    const [open, setOpen] = useState(false);

    function handleOpen () {
        setOpen(!open);
    };

    return (
        <div className='my-5'>
            <button className='bg-gray-500 text-white px-4 py-2 rounded' onClick={handleOpen}>
                Filtrar por <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {open ? <div>Aberto</div> : <div></div>}
        </div>

    )
}

export default FilterButton