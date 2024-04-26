import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

interface IParamProps {
    id?: number;
}

const paramsValidation: yup.Schema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

export const deleteByIdValidation: RequestHandler = async (req, res, next) => {
    try {
         await paramsValidation.validate(req.params, {abortEarly: false});
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


export const deleteById = async (req: Request<{}, {}, {}, IParamProps>, res: Response) =>{

    console.log(req.params);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
}