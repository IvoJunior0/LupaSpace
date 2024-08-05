import React from 'react'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

function FilterButton() {
    const [open, setOpen] = useState(false);
    const [chevron, setChevron] = useState(false);

    function handleOpen () {
        setOpen(!open);
        setChevron(!chevron);
    };

    return (
        <div className='my-5'>
            <button className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600' onClick={handleOpen}>
                Filtrar por {chevron ? <FontAwesomeIcon icon={faChevronUp}/> : <FontAwesomeIcon icon={faChevronDown}/>}
            </button>
            {open ? <div className='bg-gray-400 max-w-48 text-white px-4 py-2 rounded shadow-md'>
                        <ul>
                            <li className="flex items-center gap-1">
                                <input type="checkbox" id="checkbox-item-1" className="accent-green-600 p-2 w-4 h-4 rounded outline-none"></input>
                                <label htmlFor='checkbox-item-1'>tag1</label>
                            </li>
                            <li>
                                <input type="checkbox" id="checkbox-item-2"></input>
                                <label htmlFor='checkbox-item-2'>tag2</label>
                            </li>
                        </ul>
                    </div> : null}
        </div>

    )
}

export default FilterButton