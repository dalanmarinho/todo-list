import { ITarefa } from "../../models";
import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";

export const updateById = async (id: number, tarefa: Omit<ITarefa, 'id'|'data_criacao'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETablesNames.tarefas)
        .update(tarefa)
        .where('id', '=',id);

        if(result > 0)
            return;
        return new Error('Erro ao atualizar registro');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar registro');
    }

}