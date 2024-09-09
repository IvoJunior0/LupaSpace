import { useLocation } from "react-router-dom"

export default function CreateTopicPage() {
    const location = useLocation();
    const { state } = location;

    console.log(state)

    return(
        <>
            <div className="">CreateTopicPage</div>
        </>
    )
}