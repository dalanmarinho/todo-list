import { SquarePen, CircleUser, Calendar } from "lucide-react";
import { ButtonDelete } from "../ButtonDelete";
import { Link } from "react-router-dom";

interface CardProps {
    churrasco: ChurrascoProps
}

export function Card({ churrasco }: CardProps) {

    let qtd_pessoas = Number(churrasco.qtd_homens) + Number(churrasco.qtd_mulheres) + Number(churrasco.qtd_criancas);

    return (
        <>
            <div className="flex flex-col gap-3 p-5 rounded-md bg-amber-50 text-neutral-950 ring-[1px] ring-amber-400">
                <div className="flex justify-between">
                    <h2 className="flex gap-2 text-center items-center font-medium" title="Data do Churrasco"><Calendar size={22} />{churrasco.data}</h2>
                    <p className="flex items-center gap-2 font-medium" title="Qtd. Pessoas"><CircleUser size={22} />{qtd_pessoas}</p>
                </div>
                <hr className="my-2 border-amber-400" />
                <div className="leading-7">
                    <p className="flex justify-between">
                        <b className="font-normal">Carne (KG):</b>
                        <span className="flex justify-between gap-2 min-w-14">
                             <span className="font-medium">{churrasco.carne_kg}</span>
                             <b className="font-semibold">Kg</b>
                        </span>
                    </p>
                    <p className="flex justify-between">
                        <b className="font-normal">Pão de Alho:</b>
                        <span className="flex justify-between gap-2 min-w-14">
                             <span className="font-medium">{churrasco.pao_de_alho}</span>
                             <b className="font-semibold">Un</b>
                        </span>
                    </p>
                    <p className="flex justify-between">
                        <b className="font-normal">Carvão (KG):</b>
                        <span className="flex justify-between gap-2 min-w-14">
                             <span className="font-medium">{churrasco.carvao_kg}</span>
                             <b className="font-semibold">Kg</b>
                        </span>
                    </p>
                    <p className="flex justify-between">
                        <b className="font-normal">Refri (L):</b>
                        <span className="flex justify-between gap-2 min-w-14">
                             <span className="font-medium">{churrasco.refri_l}</span>
                             <b className="font-semibold">L</b>
                        </span>
                    </p>
                    <p className="flex justify-between">
                        <b className="font-normal">Cerveja (L):</b>
                        <span className="flex justify-between gap-2 min-w-14">
                             <span className="font-medium">{churrasco.cerveja_l}</span>
                             <b className="font-semibold">L</b>
                        </span>
                    </p>
                </div>

                <div className="flex flex-wrap-reverse sm:flex-nowrap gap-4 justify-between mt-4">
                    <ButtonDelete idChurrasco={churrasco.id} />

                    <Link to={`/edit-barbecue/${churrasco.id}`} className="flex w-full items-center justify-center 
                        flex-row sm:flex-row-reverse gap-3 px-3 py-2 rounded-full bg-blue-200 text-blue-950 
                        hover:bg-blue-300 hover:ring-[1px] hover:ring-blue-400 select-none"
                    >
                            <SquarePen size={20}/> Editar
                    </Link>
                </div>
            </div>
        </>
    )    
}