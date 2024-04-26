import {server} from './server/Server'
import { Knex } from './server/database/knex';



Knex.migrate.latest().then(()=> {
    server.listen(process.env.PORT || 3333, () =>{ 
        console.log(`App rodando na porta ${process.env.PORT  || 3333}`)
    });
});