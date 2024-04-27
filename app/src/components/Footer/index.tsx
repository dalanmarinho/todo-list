import { Credits } from "../Credits";

export function Footer() {
    return (
        <>
            <footer className="w-full bg-neutral-800 text-neutral-50 mt-12 border-t-4 border-amber-500">
                <div className="max-w-[1480px] mx-auto flex flex-wrap gap-4 items-center justify-around sm:justify-between p-5">
                    <p className="font-semibold">Projeto Churrascômetro</p>
                    <p className=""><Credits /> &copy; 2024</p>
                </div>
            </footer>
        </>
    )
}