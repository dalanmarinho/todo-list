import { NoCards } from "../../components/NoCards";
import { Card } from "../../components/Card";

import { useEffect, useState } from "react";

import { BASE_URL } from "../../util/api";
import axios from "axios";
import { useTarefaContext } from "../../context/getAll";

export function Home() {
  const [data, setData] = useTarefaContext();
  const [order, setOrder] = useState();

  const orderByTarefas = (event) => {

    setOrder(event.target.value);
  }

  useEffect(() => {
    if (order) {
      axios.get(BASE_URL, {
        params: {
          order: order,
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
  }, [order]);



  return (
    <main className="flex-1 items-stretch flex flex-col gap-6 font-Inter">

      <section>
        <div className="w-full flex flex-wrap place-content-between">
          <h1 className="flex items-center gap-2 text-xs  font-bold pb-2 mb-2 text-custom-blue">Tarefas criadas
            <span className="bg-custom-gray-400 text-custom-gray-200 px-[10px] py-[2px] rounded-full">{data.length > 0 ? data.length : 0}</span>
          </h1>
          <h1 className="flex items-center gap-2 text-xs  font-bold pb-2 mb-2 text-custom-purple  ">Ordenar
            <select onChange={orderByTarefas} value={order?order:'asc'} className="font-Inter bg-custom-gray-500 text-custom-gray-300 p-2 rounded-md font-small text-xs outline-none w-full border border-custom-gray-700 ring-custom-purple focus-within:ring-2">
              <option value={'desc'}>Mais recentes</option>
              <option value={'asc'} >Mais antigas</option>
            </select>
          </h1>
        </div>
        <div className="overflow-auto max-h-[45vh]">
          {
            (data.length > 0)
              ? data.map((tarefa) => (<Card key={tarefa.id} tarefa={tarefa} />))
              : <NoCards />
          }
        </div>
      </section>
    </main>
  );
}
