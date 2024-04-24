function Input({type, placeholder}) {
    return(
        <div className="pb-7">
            <input type={type} placeholder={placeholder} className="py-3 px-5 rounded-xl w-full outline-none text-neutral-400"/>
        </div>
    );
}

export default Input