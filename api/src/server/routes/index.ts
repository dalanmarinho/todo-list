import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {TarefasController} from '../controllers'

const router =  Router();

router.get('/', (_, res) => {
    return res.send('API rodando...');
})

router.get('/tarefas', TarefasController.getAllValidation, TarefasController.getAll);
router.get('/tarefas/:id', TarefasController.getByIdValidation, TarefasController.getById);
router.put('/tarefas/:id', TarefasController.updateByIdValidation, TarefasController.updateById);
router.post('/tarefas', TarefasController.createBodyValidation, TarefasController.create);
router.delete('/tarefas/:id', TarefasController.deleteByIdValidation, TarefasController.deleteById);



export {router};