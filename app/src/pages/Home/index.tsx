import { Calculator, ClipboardList } from "lucide-react";
import { NoCards } from "../../components/NoCards";
import { Card } from "../../components/Card";

import { useEffect, useState } from "react";
import { BASE_URL } from "../../util/api";
import axios from "axios";

export function Home() {
  const [barbecueData, setBarbecueData] = useState<ChurrascoProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(BASE_URL);
        setBarbecueData(response.data);
      } catch (error) {
        console.log("Erro na requisição:", error);
      }
    } fetchData();
  }, [barbecueData]);

  return (
    <main className="flex-1 items-stretch flex flex-col gap-6 font-Inter">

      <section>
        <div className="w-full flex flex-wrap place-content-between">
          <h1 className="flex items-center gap-2 text-xs  font-bold pb-2 mb-2 text-custom-blue">Tarefas criadas
            <span className="bg-custom-gray-400 text-custom-gray-200 px-[10px] py-[2px] rounded-full">3</span>
          </h1>
          <h1 className="flex items-center gap-2 text-xs  font-bold pb-2 mb-2 text-custom-purple  ">Concluídas</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {
            (barbecueData.length > 0)
              ? barbecueData.map((barbecue) => (<Card key={barbecue.id} churrasco={barbecue} />))
              : <NoCards />
          }
        </div>
      </section>
      {/* 
      <section>
            <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold border-b-2 border-amber-500 pb-4"><Calculator size={24} />Como funciona o cálculo?</h2>

            <div className="flex flex-col gap-8 p-8 bg-amber-50 text-neutral-950 text-justify rounded-b-md border-[1px] border-t-0 border-amber-400">
              <p>O cálculo se baseia na média de consumo individual de homens, mulheres e crianças dentro de um churrasco, sendo levado em consideração 5 (cinco) itens essenciais que compõe a maioria dos churrascos sendo eles carne, cerveja, pão de alho, refrigerante e carvão.</p>

              <p>Na média um <b>Homem-Adulto</b> consome cerca de <b>0,400 kg</b> de carne, 2 pães de alhos, 3 garrafas de 600 ml de cerveja e <b>1 kg</b> de carvão.</p>

              <p>Já dentre às <b>Mulheres-Adultas</b> o consumo só se difere na quantidade de carne que será um pouco menor sendo de <b>0,320 kg</b> de carne.</p>

              <p>No caso de <b>Crianças</b> o consumo de carne cai para <b>0,200 kg</b>, assim como pão de alho que vai para apenas 1 unidade a exceção é o consumo de carvão que permanece 1kg e que não há consumo álcool.</p>

              <p className="">Para churrascos com até 5 pessoas é recomendado até 2 Litros de refrigerante e em casos de mais pessoas é calculado baseado na quantidade de pessoas divido pela metade da mesma (dois).</p>

              <p className="text-2xl text-center bg-amber-100 rounded-md py-2 ring-1 ring-amber-200"><b>• • •</b></p>
            </div>
        </section> */}
    </main>
  );
}
