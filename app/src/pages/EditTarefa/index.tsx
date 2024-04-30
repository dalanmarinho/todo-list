import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
// import {useContext } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { NotebookPen, PenSquare } from "lucide-react";
import { useForm } from "react-hook-form";


import Input from "../../components/Input";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";

import { BASE_URL } from "../../util/api";
import { Loading } from "../../components/Loading";

const registerFormSchema = zod.object({
  data_tarefa: zod.string().refine(
    (value) => {
      const inputDate = new Date(value);
      const currentDate = new Date();

      inputDate.setDate(inputDate.getDate() + 1);
      return !isNaN(inputDate.getTime()) && inputDate >= currentDate;
    },
    { message: "A data deve ser posterior à data de hoje." }
  ),

  titulo: zod
    .string()
    .refine(
      (value) =>
        value.trim() !== "" && value.length >= 3,
      { message: "Descrição deve conter pelo menos 3 caracteres." }
    ),

  descricao: zod
    .string()
    .refine(
      (value) =>
        value.trim() !== "" && value.length >= 25,
      { message: "Descrição deve conter pelo menos 25 caracteres." }
    ),

  tempo: zod
    .string()
    .refine(
      (value) =>
        value.trim() !== "",
      { message: "Informe um tempo válido." }
    ),
});

interface IEditTarefaProps {
  parentFunction?: any;
  idTarefa?: number;
}

export type RegisterFormData = zod.infer<typeof registerFormSchema>;

export const EditTarefa = forwardRef((props:IEditTarefaProps, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChildEvent = () => {
    // Do something in the child component
    props.parentFunction();
  };

  useImperativeHandle(ref, () => ({
    // Expose parent function to parent component
    callParentFunction: handleChildEvent,
  }));

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerFormSchema) });

  function setFormValues(tarefaData: TarefaProps) {
    setValue("data_tarefa", tarefaData.data_tarefa);
    setValue("titulo", tarefaData.titulo);
    setValue("descricao", tarefaData.descricao);
    setValue("tempo", tarefaData.tempo);
  }

  function clearFormValues() {
    setValue("data_tarefa", "");
    setValue("titulo", "");
    setValue("descricao", "");
    setValue("tempo", "");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (props.idTarefa) {
          setIsEditing(true);

          const response = await axios.get(`${BASE_URL}/${props.idTarefa}`);
          const tarefaData = response.data;

          tarefaData
            ? setFormValues(tarefaData)
            : console.log(
              "Dados da tarefa não encontrados."
            );
        }
      } catch (error) {
        console.log("Erro ao obter dados:", error);
      }
    }
    fetchData();
  }, [props.idTarefa, setValue]);

  async function handleRegister(data: RegisterFormData) {
    setLoading(true);
    try {
      const FormTarefaData = data;
      if (!FormTarefaData) {
        return toast.error("Preencha pelo menos um dos campos!", {
          position: "bottom-right",
        });
      }

      if (isEditing) {
        await axios.put(`${BASE_URL}/${props.idTarefa}`, FormTarefaData);
        toast.success("Tarefa editada com sucesso!", {
          position: "bottom-right",
        });
        setLoading(false);
      } else {
        await axios.post(BASE_URL, FormTarefaData);
        toast.success("Tarefa criada com sucesso!", {
          position: "bottom-right",
        });
        setLoading(false);
        clearFormValues();
      }

      handleChildEvent();
    } catch (error: any) {
      const errorRequest = error.response.data.error
      for (const [key, value] of Object.entries(errorRequest)) {
        toast.error(`${key.charAt(0).toUpperCase() + key.slice(1)} ${String(value).toLowerCase()}`, {
          position: "bottom-right",
        });
      }
      console.log("Erro ao processar registro:", error);
      
      setLoading(false);

    }
  }

  return (
    <main>
      {loading ? (
        <Loading />
      ) : null
      }

      {isEditing ? (
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold border-b-2 pb-4">
          <PenSquare size={24} /> Editar Tarefa
        </h1>
      ) : (
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold pb-4">
          <NotebookPen size={24} /> Adicionar Tarefa
        </h1>
      )}
      <div className="w-full h-[0.1rem] bg-gradient-to-r from-custom-blue via-custom-blue  to-custom-purple mb-8 "></div>
      <div className="flex flex-wrap lg:justify-between justify-around items-center w-full gap-6">
        <div className="flex-1 sm:min-w-[300px]">
          <form
            className="w-full flex flex-col gap-4 max-w-3xl"
            onSubmit={handleSubmit(handleRegister)}
          >
            <Input text="Data da tarefa" type="date" {...register("data_tarefa")} />
            {
              <span className="text-red-500 text-sm">
                {errors.data_tarefa?.message}
              </span>
            }

            <Input
              text="Título"
              placeholder="Título da tarefa"
              type="text"
              min={0}
              {...register("titulo")}
            />
            {
              <span className="text-red-500 text-sm">
                {errors.titulo?.message}
              </span>
            }

            <Input
              text="Descrição"
              placeholder="Descrição da tarefa"
              type="text"
              {...register("descricao")}
            />
            {
              <span className="text-red-500 text-sm">
                {errors.descricao?.message}
              </span>
            }

            <Input
              text="Tempo da tarefa"
              placeholder="Tempo para realizar a tarefa"
              type="time"
              {...register("tempo")}
            />
            {
              <span className="text-red-500 text-sm">
                {errors.tempo?.message}
              </span>
            }

            <button
              className="w-[8rem] mx-auto bg-custom-blue-dark text-custom-gray-100 outline-none ring-custom-blue-dark focus-within:ring-4 p-2 rounded-md text-xl font-semibold hover:brightness-105 "
              type="submit"
            >
              {isEditing ? "Atualizar" : "Salvar"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
});
