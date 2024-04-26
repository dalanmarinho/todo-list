import { ITarefa } from "../../models";

declare module 'knex/types/tables' {
    interface Tables {
        tarefa: ITarefa
    }
}