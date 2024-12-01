import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function SearchButton() {
    return(
        <button className="">
            <Link to={"/pesquisa"}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-2xl"/>
            </Link>
        </button>
    );
}