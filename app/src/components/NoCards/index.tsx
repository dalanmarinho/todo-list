import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

export function NoCards() {
    return (
        <Link to="#" className="flex items-center justify-center h-[200px] w-full bg-custom-gray-500 hover:bg-custom-gray-400 hover:cursor-pointer col-span-4 rounded-md ring-1 ring-custom-gray-400 select-none">
            <div className="flex flex-col gap-2 items-center text-center text-balance max-w-96 text-custom-gray-300">
                <ClipboardList size={42} className="text-custom-gray-300" />
                <p ><b>Você ainda não tem tarefas cadastradas</b>    Crie tarefas e organize seus itens a fazer</p>
            </div>
        </Link>
    )
}