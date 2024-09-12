import { Link } from "react-router-dom";

export default function CommunityShortcut({ id }) {
    return (
        <Link to={`/comunidades/${id}`}>Comunidade {id}</Link>
    );
}