import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchButton() {
    return(
        <button className="hidden max-md:block">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-2xl"/>
        </button>
    );
}