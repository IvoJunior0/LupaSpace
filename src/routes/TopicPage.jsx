import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";


export default function TopicPage() {
    const { topicID } = useParams();
    const location = useLocation();
    console.log(location)
    return (
        <>
            <h1 className="">{topicID}</h1>
        </>
    );
}