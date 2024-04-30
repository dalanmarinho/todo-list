
export function Footer() {
    return (
        <>
            <footer className="w-full bg-neutral-800 text-neutral-50 ">
                <div className="w-full h-[0.3rem] bg-gradient-to-r from-custom-blue via-custom-blue  to-custom-purple "></div>
                <div className="max-w-[1480px] mx-auto flex flex-wrap gap-4 justify-center sm:justify-center p-5">
                    <p className="font-semibold">Projeto 
                        <span className="bg-gradient-to-r from-sky-400 from-45% to-custom-purple to-40% inline-block text-transparent bg-clip-text ml-2 font-semibold">toDo</span>
                        <span className="ml-2 text-xs">&copy; 2024</span>
                    </p>
                </div>
            </footer>
        </>
    )
}