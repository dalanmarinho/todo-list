declare type ChurrascoProps = {
  id?: string;
  data: string;
  qtd_homens: number;
  qtd_mulheres: number;
  qtd_criancas: number;
  carne_kg: number | string;
  carvao_kg: number;
  pao_de_alho: number;
  refri_l: number;
  cerveja_l: number | string;
};

declare type BarbecueDataProps = {
  data: string;
  qtd_homens: number;
  qtd_mulheres: number;
  qtd_criancas: number;
};
