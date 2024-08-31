import { useEffect } from "react"

export default function ForumMembers({ id }) {
    useEffect(() => {
        const fetchUser = async () => {
            try {

            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [id]);

    return(
        <>
        </>
    )
}