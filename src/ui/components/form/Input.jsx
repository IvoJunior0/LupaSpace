function Input({type, placeholder, children}) {
    return(
        <div className="pb-7 relative">
            <input type={type} placeholder={placeholder} className="pl-12 py-3 px-5 rounded-xl w-full outline-none text-neutral-400"/>
            <div className="absolute top-3 left-5 text-neutral-400">
                {children}
            </div>
        </div>
    );
}

export default Input