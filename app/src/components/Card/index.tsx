import { Calendar, AlarmClock } from "lucide-react";
import { ButtonDelete } from "../ButtonDelete";
import { ButtonEdit } from "../ButtonEdit";
import { formatDate } from "../../util/formateDate";

interface CardProps {
    tarefa: TarefaProps
}

export function Card({ tarefa }: CardProps) {

    return (
        <>
            <div className="flex flex-col gap-3 p-5 rounded-md bg-custom-gray-500 text-custom-gray-100 ring-[1px] ring-custom-gray-400 mb-4">
                <div className="flex justify-between">
                    <h2 className="flex gap-2 text-center items-center font-medium" title="Data da Tarefa"><Calendar size={22} />{formatDate(tarefa.data_tarefa)}</h2>
                    <p className="flex items-center gap-2 font-medium" title="Qtd. Pessoas"><AlarmClock size={22} />{tarefa.tempo}</p>
                </div>
                <hr className="my-2 border-custom-gray-300" />
                <div className="flex justify-between">
                    <div className="leading-7 w-[80%]">
                        <p className="font-bold text-sm">
                            {tarefa.titulo}
                        </p>
                        <p className="font-normal text-sm">
                            {tarefa.descricao}
                        </p>
                    </div>
                    <div className="w-[15%] flex flex-wrap-reverse sm:flex-nowrap gap-1 justify-between">
                        <ButtonDelete idTarefa={tarefa.id} />
                        <ButtonEdit idTarefa={tarefa.id} />
                    </div>
                </div>
            </div>
        </>
    )
}