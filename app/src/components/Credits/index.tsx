import * as Dialog from "@radix-ui/react-dialog";
import PosterImage from "../../assets/poster.jpg";
import { Laptop, X } from "lucide-react";

export function Credits() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="font-semibold text-amber-400 hover:text-amber-500 rounded-md p-1 outline-none ring-amber-500 focus-within:ring-2 border-2 border-amber-400 hover:border-amber-500 ">
        Frontline Coders
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50 flex justify-center items-center">
          <Dialog.Content className="flex flex-wrap md:flex-nowrap relative bg-amber-50 text-amber-950 outline-none rounded-md ring-2 m-5 ring-amber-400">
            <Dialog.Close className="bg-amber-400 hover:bg-amber-300 rounded-bl-md absolute top-0 right-0 p-2">
              <X size={22} />
            </Dialog.Close>
            <div className="p-5">
              <h2 className="font-Staatliches text-xl sm:text-2xl flex items-center gap-2 mb-2">
                <Laptop /> Frontline Coders
              </h2>
              <p>Projeto Churrascômetro, construído em equipe por:</p>
              <ul className="p-5 box-border list-disc">
                <li>Raphael Moura</li>
                <li>Dalan Marinho</li>
                <li>Lucas Freitas</li>
                <li>Vitor Galindo</li>
                <li>Larissa Vasconcelos</li>
                <li>Leidiane Silva</li>
              </ul>
              <div className="border-b-2 border-amber-400" />
            </div>

            <div className="h-[200px] w-full md:w-[347px] md:min-h-[480px]">
              <img
                src={PosterImage}
                className="w-full md:w-[347px] h-full object-cover object-bottom bg-amber-500"
              />
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
