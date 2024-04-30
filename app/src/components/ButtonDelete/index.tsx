import * as Dialog from "@radix-ui/react-dialog";
import { AlertCircle, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../util/api";
import { Loading } from "../../components/Loading";
import { useState } from "react";
import { useTarefaContext } from "../../context/getAll";

interface ButtonDeleteProps {
    idTarefa: number | undefined,
}



export function ButtonDelete({ idTarefa }: ButtonDeleteProps) {
    const [data, setData] = useTarefaContext();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    async function deleteTarefa(id?: number): Promise<boolean> {
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            toast.success("Tarefa excluída com sucesso!",
                { position: "bottom-right", });
            await axios.get(BASE_URL)
                .then((response) => {
                    if (response.status) {
                        setData(response.data);
                    }
                    setOpen(false);
                    setLoading(false);

                })
                .catch((error) => {
                    console.log("Erro na requisição:", error);
                    setLoading(false);

                });
            return true;
        }

        catch (error) {
            console.log("Erro ao deletar tarefa:", error);
            toast.error("Erro ao excluir tarefa. Tente novamente.",
                { position: "bottom-right", });
            return false;
        }
    }

    return (
        <>
            
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger className="flex w-full items-center justify-center gap-3 px-3 py-2 
                select-none text-custom-gray-300 hover:text-red-600 ">
                    <Trash2 size={18} />
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="inset-0 fixed bg-black/50 flex justify-center items-center">
                        <Dialog.Content className="bg-custom-gray-400 relative text-custom-gray-100 p-5 outline-none rounded-md ring-2 m-5 ring-custom-gray-500">
                        {loading ? (
                            <Loading />
                        ) : null
                        }
                            <h2 className="font-Staatliches text-xl sm:text-2xl flex items-center gap-2 mb-2"><AlertCircle size={32} /> Excluir Tarefa</h2>
                            <p>Tem certeza de que deseja excluir o item selecionado?</p>
                            <div className="flex flex-wrap-reverse sm:flex-nowrap mt-6 gap-2">
                                <button
                                    onClick={() => deleteTarefa(idTarefa)}
                                    className="flex w-full items-center justify-center gap-3 px-3 py-2 rounded-full 
                                bg-red-200 text-red-950 hover:bg-red-300 hover:ring-1 hover:ring-red-400">
                                    <Trash2 size={20} /> Excluir</button>

                                <Dialog.Close className="flex w-full items-center justify-center gap-3 px-3 py-2 rounded-full 
                            bg-white text-neutral-950 hover:bg-gray-300 ring-1 ring-neutral-400">
                                    <X size={20} /> Cancelar</Dialog.Close>
                            </div>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}