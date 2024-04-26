import type { Knex } from "knex";
import { ETablesNames } from "../ETablesNames";


export async function up(knex: Knex) {
    return knex
    .schema
    .createTable(ETablesNames.tarefas, table => {
        table.bigIncrements('id').primary().index();
        table.string('titulo', 150).checkLength('<=', 150).index().notNullable();
        table.string('descricao', 255).checkLength('<=', 255).notNullable();
        table.datetime('data_tarefa').notNullable();
        table.datetime('data_criacao').defaultTo(knex.fn.now());
        table.time('tempo').defaultTo(knex.fn.now());
    }).then(() => {
        console.log(`# Created table ${ETablesNames.tarefas}`)
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETablesNames.tarefas).then(() => {
        console.log(`# Dropped table ${ETablesNames.tarefas}`)
    });
}

