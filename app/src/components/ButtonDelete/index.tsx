import * as Dialog from "@radix-ui/react-dialog";
import { AlertCircle, Trash2, X } from "lucide-react";
import { deleteBarbecue } from "../../util/deleteBarbecue";

interface ButtonDeleteProps {
    idChurrasco: string | undefined,
}

export function ButtonDelete({ idChurrasco }: ButtonDeleteProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="flex w-full items-center justify-center gap-3 px-3 py-2 rounded-full outline-red-400
                select-none bg-red-200 text-red-950 hover:bg-red-300 hover:ring-[1px] hover:ring-red-400">
                <Trash2 size={20}/> Apagar
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50 flex justify-center items-center">
                    <Dialog.Content className="bg-amber-50 text-neutral-950 p-5 outline-none rounded-md ring-2 m-5 ring-amber-400">
                        <h2 className="font-Staatliches text-xl sm:text-2xl flex items-center gap-2 mb-2"><AlertCircle size={32}/> Excluir Churrasco</h2>
                        <p>Tem certeza de que deseja excluir o item selecionado?</p>
                        <div className="flex flex-wrap-reverse sm:flex-nowrap mt-6 gap-2">
                            <button 
                                onClick={() => deleteBarbecue(idChurrasco)}
                                className="flex w-full items-center justify-center gap-3 px-3 py-2 rounded-full 
                                bg-red-200 text-red-950 hover:bg-red-300 hover:ring-1 hover:ring-red-400">
                                <Trash2 size={20}/> Excluir</button>

                            <Dialog.Close className="flex w-full items-center justify-center gap-3 px-3 py-2 rounded-full 
                            bg-white text-neutral-950 hover:bg-gray-300 ring-1 ring-neutral-400">
                                <X size={20}/> Cancelar</Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}