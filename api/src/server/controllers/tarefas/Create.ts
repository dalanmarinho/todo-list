import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { ITarefa } from "../../database/models";
import { TarefasProvider } from "../../database/providers/tarefas";

interface IBodyProps extends Omit<ITarefa, 'id' | 'data_criacao'>{};

const now = new Date();

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    titulo: yup.string().required().min(3),
    descricao: yup.string().required().min(15),
    data_tarefa: yup.date().min(new Date(now.setDate(now.getDate() - 1))).required(),
    tempo: yup.string().required()
});

export const createBodyValidation: RequestHandler = async (req, res, next) => {
    try {
         await bodyValidation.validate(req.body, {abortEarly: false});
         next();
    } catch (err) {
        const yupError = err as yup.ValidationError;
        const validationErrors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            if(!error.path) return;
            validationErrors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
            error: validationErrors
        })
    }
}


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) =>{
    const result = await TarefasProvider.create(req.body);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
}