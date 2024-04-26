import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { TarefasProvider } from "../../database/providers/tarefas";

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
    id?: number;
}

const queryValidation: yup.Schema<IQueryProps> = yup.object().shape({
    page: yup.number().moreThan(0),
    limit: yup.number().moreThan(0),
    filter: yup.string(),
    id: yup.number().moreThan(0)
});

export const getAllValidation: RequestHandler = async (req, res, next) => {
    try {
         await queryValidation.validate(req.query, {abortEarly: false});
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


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) =>{
    const result = await TarefasProvider.getAll(req.query.page || 1, req.query.limit || 10,req.query.filter || '', Number(req.query.id));
    const count = await TarefasProvider.count(req.query.filter || '');

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }else if(count instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message
            }
        });
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(result);
}