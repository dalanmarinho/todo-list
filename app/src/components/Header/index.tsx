import { PlusCircle } from "lucide-react";
import LogoImage from "../../assets/rocket.png";
import { Link } from "react-router-dom";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";

const registerFormSchema = zod.object({

  filter: zod
    .string()
    
});
export type RegisterFormData = zod.infer<typeof registerFormSchema>;


export function Header() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerFormSchema) });


  return (
    <header className="bg-custom-gray-700 text-neutral-50 mb-12 relative">
      <div className="max-w-[1480px] h-[200px] mx-auto flex flex-wrap gap-4 items-center justify-center sm:justify-center p-5">
        <h1 className="font-Inter text-4xl font-black ">
          <Link to="/" className="flex items-start gap-2 ">
            <img
              src={LogoImage}
              className="w-[25px] h-full object-cover object-bottom "
            />
            <span className="bg-gradient-to-r from-sky-400 from-45% to-custom-purple to-40% inline-block text-transparent bg-clip-text ">todo</span>
            {/* <Link to="/" className="flex items-start gap-2 hover:text-amber-500"><ChefHat size={28}/>Churrascômetro</Link> */}
          </Link>
        </h1>
        <div className="w-full flex flex-wrap items-center justify-center space-x-2 absolute bottom-[-1.5rem] w-[55vw] ">
          <div className="w-[50%]">
            <Input placeholder="Buscar tarefa"  type="text" {...register("filter")} />
          </div>
          <div className="w-auto">
            <Link reloadDocument to="/edit-barbecue" className="flex items-center gap-2 p-3 rounded-md bg-custom-blue-dark  text-xs hover:bg-sky-600 text-text-custom-gray-100 hover:text-custom-gray-100">Criar <PlusCircle size={15}/></Link>
          </div>
        </div>
        {/* <nav>
          <ul className="flex gap-4 font-semibold">
            <li><Link reloadDocument to="/edit-barbecue" className="flex items-center gap-2 px-4 py-3 rounded-md bg-amber-300 border-2 border-amber-400 hover:bg-amber-400 text-neutral-800 hover:text-amber-950"><PlusCircle />Criar Churrasco</Link></li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
}