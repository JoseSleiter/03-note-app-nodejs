import {
    Request,
    Response,
    NextFunction
} from 'express';

class ValidateRequiredBodyFields {
    public check(allowedPatchFields: string[]): (req: Request, res: Response, next: NextFunction) => void {
        return (
            req: Request,
            res: Response,
            next: NextFunction
        ): void | any => {
            const missingFields = []

            for (let field of allowedPatchFields) {
                if (!(field in req.body)) {
                    // @ts-ignore
                    missingFields.push(`Missing required field: ${field}`);
                }
            }

            if (!req.body || missingFields.length > 0) {
                return res.status(400).send({
                    error: missingFields,
                });
            }
            next();
        }
    }
}

export { ValidateRequiredBodyFields };