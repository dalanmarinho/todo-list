import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

interface IParamProps {
    id?: number;
}

interface IBodyProps {
    titulo: string;
    descricao: string;
    data: string;
    tempo: string;
}

const paramsValidation: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    titulo: yup.string().required().min(3),
    descricao: yup.string().required().min(15),
    data: yup.string().required(),
    tempo: yup.string().required()
});

export const updateByIdValidation: RequestHandler = async (req, res, next) => {
    try {
         await paramsValidation.validate(req.params, {abortEarly: false});
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


export const updateById = async (req: Request<{}, {}, {}, IParamProps>, res: Response) =>{

    console.log(req.params);
    console.log(req.body);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
}