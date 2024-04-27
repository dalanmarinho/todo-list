import { useEffect, useState } from "react";
// import {useContext } from "react";
// import { calculateBarbecue } from "../../util/calculateBarbecue";
import { useNavigate, useParams } from "react-router-dom";
import { NotebookPen, PenSquare } from "lucide-react";
import { useForm } from "react-hook-form";

//Contextos
// import { BarbecueContext } from "../../context/calc";
import { useBarbecueStore } from "../../zustand/barbecueStore";

//Hook
// import { useBarbecue } from "../../hooks/useBarbecue";

import Input from "../../components/Input";
import toast from "react-hot-toast";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";

import { BASE_URL } from "../../util/api";
import { ImageCard } from "../../components/ImageCard";

const registerFormSchema = zod.object({
  barbecueDate: zod.string().refine(
    (value) => {
      const inputDate = new Date(value);
      const currentDate = new Date();

      inputDate.setDate(inputDate.getDate() + 1);

      return !isNaN(inputDate.getTime()) && inputDate >= currentDate;
    },
    { message: "A data deve ser igual ou posterior à data de hoje." }
  ),

  numberOfMen: zod
    .string()
    .refine(
      (value) =>
        value.trim() !== "" && !isNaN(Number(value)) && Number(value) >= 0,
      { message: "Digite um valor válido." }
    ),

  numberOfWomen: zod
    .string()
    .refine(
      (value) =>
        value.trim() !== "" && !isNaN(Number(value)) && Number(value) >= 0,
      { message: "Digite um valor válido." }
    ),

  numberOfchildren: zod
    .string()
    .refine(
      (value) =>
        value.trim() !== "" && !isNaN(Number(value)) && Number(value) >= 0,
      { message: "Digite um valor válido (mínimo: 0)." }
    ),
});

export type RegisterFormData = zod.infer<typeof registerFormSchema>;

export const EditBarbecue = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // const { calculateBarbecue } = useContext(BarbecueContext);
  const calculateBarbecue = useBarbecueStore(
    (state) => state.calculateBarbecue
  );
  // const { calculateBarbecue } = useBarbecue();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerFormSchema) });

  function setFormValues(churrascoData: BarbecueDataProps) {
    setValue("barbecueDate", churrascoData.data.split("-").reverse().join("-"));
    setValue("numberOfMen", churrascoData.qtd_homens.toString());
    setValue("numberOfWomen", churrascoData.qtd_mulheres.toString());
    setValue("numberOfchildren", churrascoData.qtd_criancas.toString());
  }

  function clearFormValues() {
    setValue("barbecueDate", "");
    setValue("numberOfMen", "");
    setValue("numberOfWomen", "");
    setValue("numberOfchildren", "");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          setIsEditing(true);

          const response = await axios.get(`${BASE_URL}/${id}`);
          const barbecueData = response.data;

          barbecueData
            ? setFormValues(barbecueData)
            : console.log(
                "Dados do churrasco não encontrados na resposta da API."
              );
        }
      } catch (error) {
        console.log("Erro ao obter dados do churrasco:", error);
      }
    }
    fetchData();
  }, [id, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      const FormBarbecueData = calculateBarbecue(data);
      if (!FormBarbecueData) {
        return toast.error("Preencha pelo menos um dos campos!", {
          position: "bottom-right",
        });
      }

      if (isEditing) {
        await axios.put(`${BASE_URL}/${id}`, FormBarbecueData);
        toast.success("Churrasco editado com sucesso!", {
          position: "bottom-right",
        });
      } else {
        await axios.post(BASE_URL, FormBarbecueData);
        toast.success("Churrasco criado com sucesso!", {
          position: "bottom-right",
        });
        clearFormValues();
      }

      navigate("/");
    } catch (error) {
      console.log("Erro ao processar registro:", error);
      toast.error("Erro ao processar registro. Tente novamente.", {
        position: "bottom-right",
      });
    }
  }

  return (
    <main>
      {isEditing ? (
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold border-b-2 border-amber-500 pb-4 mb-8">
          <PenSquare size={24} /> Editar Churrasco
        </h1>
      ) : (
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold border-b-2 border-amber-500 pb-4 mb-8">
          <NotebookPen size={24} /> Criar Novo Churrasco
        </h1>
      )}

      <div className="flex flex-wrap lg:justify-between justify-around items-center w-full gap-6">
        <div className="flex-1 sm:min-w-[300px]">
          <form
            className="w-full flex flex-col gap-4 max-w-3xl"
            onSubmit={handleSubmit(handleRegister)}
          >
            <Input text="Data" type="date" {...register("barbecueDate")} />
            {
              <span className="text-red-500 text-sm">
                {errors.barbecueDate?.message}
              </span>
            }

            <Input
              text="Quantidade de Homens:"
              type="number"
              min={0}
              {...register("numberOfMen")}
            />
            {
              <span className="text-red-500 text-sm">
                {errors.numberOfMen?.message}
              </span>
            }

            <Input
              text="Quantidade de Mulheres"
              type="number"
              min={0}
              {...register("numberOfWomen")}
            />
            {
              <span className="text-red-500 text-sm">
                {errors.numberOfWomen?.message}
              </span>
            }

            <Input
              text="Quantidade de Crianças"
              type="number"
              min={0}
              {...register("numberOfchildren")}
            />
            {
              <span className="text-red-500 text-sm">
                {errors.numberOfchildren?.message}
              </span>
            }

            <button
              className="w-full bg-amber-500 text-amber-950 outline-none ring-amber-700 focus-within:ring-4 p-3 rounded-md text-xl font-semibold hover:brightness-105 uppercase"
              type="submit"
            >
              {isEditing ? "Atualizar" : "Salvar"}
            </button>
          </form>
        </div>
        <ImageCard />
      </div>
    </main>
  );
};
