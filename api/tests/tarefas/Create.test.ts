
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Tarefas - Create', ()=>{

    it('Criar registro', async ()=>{
       const res1 = await testServer
       .post('/tarefas')
        .send({
            titulo: "Teste",
            descricao: "Teste dsadqw eqdwqdasd",
            data: "Teste",
            tempo: "Teste"
        });

         expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    });
});