import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { ITarefa } from "../../database/models";
import { TarefasProvider } from "../../database/providers/tarefas";

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<ITarefa, 'id' | 'data_criacao'> { };

const paramsValidation: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

const getFormatedDate = (currentDate: any) => {
    return currentDate.split('/').reverse().join('-');
}


const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    titulo: yup.string().required().min(3),
    descricao: yup.string().required().min(15),
    data_tarefa: yup.date().min(getFormatedDate(new Date().toLocaleDateString())).required(),
    tempo: yup.string().required()
});

export const updateByIdValidation: RequestHandler = async (req, res, next) => {
    try {
        await paramsValidation.validate(req.params, { abortEarly: false });
        await bodyValidation.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const yupError = err as yup.ValidationError;
        const validationErrors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            if (!error.path) return;
            validationErrors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
            error: validationErrors
        })
    }
}


export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }
    const result = await TarefasProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
}