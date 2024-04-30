import * as Dialog from "@radix-ui/react-dialog";
import { SquarePen, X, PlusCircle } from "lucide-react";
import { EditTarefa } from "../../pages/EditTarefa";
import { useRef, useState } from "react";
import { BASE_URL } from "../../util/api";
import axios from "axios";
import { useTarefaContext } from "../../context/getAll";


interface ButtonEditProps {
    idTarefa?: number | undefined,
    headerButton?: boolean | undefined
}



export function ButtonEdit({ idTarefa, headerButton }: ButtonEditProps) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useTarefaContext();
  // function closeDialog()   {
    //     console.log('close');
    //     setOpen(false);
    //     // <Dialog.Close></Dialog.Close>
    // }
    const childRef = useRef(null);
    const handleParentFunction = ():void => {
        // Do something in the parent component 
        axios.get(BASE_URL)
            .then((response) => {
                if (response.status) {
                    setData(response.data);
                }
                setOpen(false)

            })
            .catch((error) => {
                console.log("Erro na requisição:", error);
            });
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            {
                headerButton ?
                    <Dialog.Trigger className="flex items-center gap-2 p-3 rounded-md bg-custom-blue-dark  text-xs hover:bg-sky-600 text-text-custom-gray-100 hover:text-custom-gray-100">
                        Criar <PlusCircle size={15} />
                    </Dialog.Trigger>
                    :

                    <Dialog.Trigger className="flex w-full items-center justify-center gap-3 px-3 py-2 
                        select-none text-custom-gray-300 hover:text-green-600">
                        <SquarePen size={18} />
                    </Dialog.Trigger>
            }
            <Dialog.Portal>

                <Dialog.Overlay className="inset-0 fixed bg-black/50 flex justify-center items-center">
                    <Dialog.Content className="bg-custom-gray-600 relative text-custom-gray-100 p-5 outline-none rounded-md ring-2 m-5 ring-custom-purple min-w-[40vw]">
                        <Dialog.Close className="bg-custom-purple-dark hover:bg-custom-purple rounded-bl-md absolute top-0 right-0 p-2">
                            <X size={22} />
                        </Dialog.Close>
                        <EditTarefa idTarefa={idTarefa} ref={childRef} parentFunction={handleParentFunction} />   
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}