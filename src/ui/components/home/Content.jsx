import FilterButton from "../buttons/FilterButton";

export default function Content() {
    return(
        <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2">
            <h1 className="sm:text-3xl text-2xl text-gray-500 font-semibold">Últimas publicações</h1>
            <FilterButton/>
        </div>
    );
}