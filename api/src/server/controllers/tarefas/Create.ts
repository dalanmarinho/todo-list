import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

interface ITarefa {
    titulo: string;
    descricao: string;
    data: string;
    tempo: string;
}

const bodyValidation: yup.Schema<ITarefa> = yup.object().shape({
    titulo: yup.string().required().min(3),
    descricao: yup.string().required().min(15),
    data: yup.string().required(),
    tempo: yup.string().required(),
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


export const create = async (req: Request<{}, {}, ITarefa>, res: Response) =>{

    console.log(req.body);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
}