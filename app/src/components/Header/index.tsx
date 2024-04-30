import { X } from "lucide-react";
import LogoImage from "../../assets/rocket.png";
import { Link } from "react-router-dom";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { ButtonEdit } from "../ButtonEdit";
import { useEffect, useState } from "react";
import { useTarefaContext } from "../../context/getAll";
import { BASE_URL } from "../../util/api";
import axios from "axios";

const registerFormSchema = zod.object({

  filter: zod
    .string()

});
export type RegisterFormData = zod.infer<typeof registerFormSchema>;


export function Header() {
  const [query, setQuery] = useState("");
  const [apiQuery, setApiQuery] = useState("");
  const [data, setData] = useTarefaContext();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setApiQuery(query)
    }, 500);

    return () => clearTimeout(timeoutId)
  }, [query]);

  useEffect(() => {
    if (apiQuery) {
      axios.get(BASE_URL, {
        params: {
          filter: apiQuery,
        }
      })
        .then((response) => {
          if (response.status) {
            setData(response.data);
          }
        })
        .catch((error) => {
          console.log("Erro na requisição:", error);
        });
    }
  }, [apiQuery]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerFormSchema) });

  const changeFilter = (event) => {
    const filter = event.target.value;
    setQuery(filter);
  }

  const resetFilter = () => {
    setQuery("");
    setApiQuery("");
    setValue("filter", "");

    axios.get(BASE_URL)
      .then((response) => {
        if (response.status) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log("Erro na requisição:", error);
      });
  }


  return (
    <header className="bg-custom-gray-700 text-neutral-50 mb-12 relative">
      <div className="max-w-[1480px] h-[200px] mx-auto flex flex-wrap gap-4 items-center justify-center sm:justify-center p-5">
        <h1 className="font-Inter text-4xl font-black ">
          <Link to="/" className="flex items-start gap-2 ">
            <img
              src={LogoImage}
              className="w-[25px] h-full object-cover object-bottom "
            />
            <span className="bg-gradient-to-r from-sky-400 from-45% to-custom-purple to-40% inline-block text-transparent bg-clip-text ">toDo</span>
            {/* <Link to="/" className="flex items-start gap-2 hover:text-amber-500"><ChefHat size={28}/>Churrascômetro</Link> */}
          </Link>
        </h1>
        <div className="w-full flex flex-wrap items-center justify-center space-x-2 absolute bottom-[-1.5rem] w-[55vw] ">
          <div className="w-[50%] relative">
            <Input placeholder="Buscar tarefa" type="text" {...register("filter")} onChange={changeFilter} />
            {apiQuery ? (
              <X className="absolute right-5 top-4 cursor-pointer" size={15}
                onClick={resetFilter} />

            ) : null}
          </div>
          <div className="w-auto">
            <ButtonEdit headerButton={true} />
          </div>
        </div>
      </div>
    </header>
  );
}