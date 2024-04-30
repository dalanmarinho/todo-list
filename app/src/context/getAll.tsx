import { type Dispatch, type SetStateAction, ReactNode, createContext, useContext, useEffect, useState } from "react";

import { formatDate } from "../util/formateDate";
import { RegisterFormData } from "../pages/EditTarefa";
import { BASE_URL } from "../util/api";
import axios from "axios";
import { Loading } from "../components/Loading";

interface TarefaProviderProps {
  children: ReactNode;
}

type ITarefaState = [
  ITarefa[],
  Dispatch<SetStateAction<ITarefa[]>>,
];

const TarefaContext = createContext<ITarefaState>([[], () => {}]);

export function TarefaProvider({ children }: TarefaProviderProps) {
  const [data, setData] = useState<ITarefa[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    data.length === 0 && setLoading(true); fetchData();
  }, []);

  

  const fetchData = async () => {
    return axios.get(BASE_URL)
      .then((response) => {
        if (response.status) {
          setData(response.data);
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log("Erro na requisição:", error);
      });
  };

  return (
    <TarefaContext.Provider value={[data, setData]}>

      {loading ? (
          <Loading />
      ) : null
      }
      {children}
    </TarefaContext.Provider>
  );
}
export const useTarefaContext = () => useContext(TarefaContext);