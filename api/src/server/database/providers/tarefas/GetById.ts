import { ITarefa } from "../../models";
import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";

export const getById = async (id: number): Promise<ITarefa | Error> => {
    try {
        const result = await Knex(ETablesNames.tarefas)
        .select('*')
        .where('id', '=',id)
        .first();

        if(result)
            return result;
        return new Error('Registro não encontrado');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro');
    }

}