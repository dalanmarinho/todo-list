import { ITarefa } from "../../models";
import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ITarefa[] | Error> => {
    try {
        const result = await Knex(ETablesNames.tarefas)
        .select('*')
        .where('id',Number(id))
        .orWhere('titulo', 'like', `%${filter}%`)
        .offset((page-1) * limit)
        .limit(limit);

        return result;

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registros');
    }

}

export const count = async (filter: string = ''): Promise<number | Error> => {
    try {
        const [{count}] = await Knex(ETablesNames.tarefas)
        .where('titulo', 'like', `%${filter}%`)
        .count<[{count:number}]>('* as count');

        if(Number.isInteger(Number(count))) return Number(count);

        return new Error('Erro ao consultar quantidade');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar quantidade');
    }

}