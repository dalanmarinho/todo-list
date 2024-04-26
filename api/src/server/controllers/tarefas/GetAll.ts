import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

const queryValidation: yup.Schema<IQueryProps> = yup.object().shape({
    page: yup.number().moreThan(0),
    limit: yup.number().moreThan(0),
    filter: yup.string()
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

    console.log(req.query);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
}