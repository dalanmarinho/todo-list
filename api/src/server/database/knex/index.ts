import {knex} from "knex";
import {development, production} from "./Enviroment";

const getEnviroment = () => {
    switch (process.env.NODE_ENV) {
        case 'production': 
            return production;
        default:
            return development;
    }
}

export const Knex = knex(getEnviroment());