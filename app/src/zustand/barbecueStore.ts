import { create } from "zustand";

import { formatDate } from "../util/formateDate";
import { RegisterFormData } from "../pages/EditBarbecue";

export interface BarbecueStore {
  calculateBarbecue: (data: RegisterFormData) => ChurrascoProps;
}

export const useBarbecueStore = create<BarbecueStore>(() => ({
  calculateBarbecue: (data) => {
    let qtd_criancas = Number(data?.numberOfchildren);
    let qtd_mulheres = Number(data?.numberOfWomen);
    let qtd_homens = Number(data?.numberOfMen);

    let qtd_pessoas = qtd_homens + qtd_mulheres + qtd_criancas;

    return {
      data: formatDate(data.barbecueDate),
      qtd_homens: qtd_homens,
      qtd_mulheres: qtd_mulheres,
      qtd_criancas: qtd_criancas,
      carne_kg: (qtd_homens * 0.4 + qtd_mulheres * 0.32 + qtd_criancas * 0.2)
        .toFixed(1)
        .replace(".", ","),
      carvao_kg: qtd_homens * 1 + qtd_mulheres * 1 + qtd_criancas * 1,
      pao_de_alho: qtd_homens * 2 + qtd_mulheres * 2 + qtd_criancas * 1,
      refri_l: qtd_pessoas <= 5 ? 2 : Math.ceil(qtd_pessoas / 5),
      cerveja_l: ((qtd_homens * 3 + qtd_mulheres * 3 + qtd_criancas * 0) * 0.6)
        .toFixed(1)
        .replace(".", ","),
    };
  },
}));
