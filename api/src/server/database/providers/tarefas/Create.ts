import { ITarefa } from "../../models";
import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";

export const create = async (tarefa: Omit<ITarefa, 'id'|'data_criacao'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETablesNames.tarefas).insert(tarefa).returning('id');

        if(typeof result  === 'object'){
            return result.id;
        }else if(typeof result  === 'number'){

        }
        return new Error('Erro ao cadastrar registro');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar registro');
    }

}