import { useContext } from "react";
import { BarbecueContext } from "../context/calc";
import { RegisterFormData } from "../pages/EditBarbecue";

// import { useBarbecueStore, BarbecueStore } from "../zustand/barbecueStore";

// Fazendo o uso do Zustand

// interface UseBarbecue extends BarbecueStore {}

// export function useBarbecue(): UseBarbecue {
//   const { calculateBarbecue } = useBarbecueStore((state) => state);

//   return {
//     calculateBarbecue,
//   };
// }

//*********************************************************************************************/

// Fazendo o uso do ContextApi

interface UseBarbecue {
  calculateBarbecue: (data: RegisterFormData) => ChurrascoProps;
}

export function useBarbecue(): UseBarbecue {
  const { calculateBarbecue } = useContext(BarbecueContext);

  return {
    calculateBarbecue,
  };
}
