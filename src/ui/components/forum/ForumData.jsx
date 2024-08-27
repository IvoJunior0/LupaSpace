export default function ForumData(props) {    
    return(
        <div className={`row-span-2 ${props.css} row-start-1 flex flex-col text-center justify-center gap-2`}>
            <h1 className="text-2xl">{props.counter}</h1>
            <h4>{props.data}</h4>
        </div>
    );
}