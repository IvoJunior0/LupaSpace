export default function Loading() {
    return(
        <div className="h-full w-full flex justify-center items-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-[5px] border-solid border-green-600 border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"/>
        </div>
    );
}