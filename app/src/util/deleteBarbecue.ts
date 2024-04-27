import toast from "react-hot-toast";
import axios from "axios";

import { BASE_URL } from "./api";

export async function deleteBarbecue(id?: string): Promise<boolean> {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    toast.success("Churrasco excluído com sucesso!", 
    { position: "bottom-right", });
    return true;
  } 
  
  catch (error) {
    console.log("Erro ao deletar churrasco:", error);
    toast.error("Erro ao excluir churrasco. Tente novamente.", 
    { position: "bottom-right", });
    return false;
  }
}