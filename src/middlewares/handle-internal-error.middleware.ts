import {
    Request,
    Response,
    NextFunction
} from 'express';

class HandleInternalError {
    public check(
        err: any,
        _req: Request,
        res: Response,
        next: NextFunction
    ): void | any {
        console.log(err.constructor.name)
        console.log('Error: HandleInternalError', err)

        if (err.error === 'access_denied') {
            return res.redirect('/');
        }
        if (err instanceof TypeError) {
            return res.status(500).send({
                error: "Oops! Error in server code",
                socialNetwork: [
                    'If you need a FullStack Developer for your projects, contact me by linkedin',
                    'https://www.linkedin.com/in/jose-sleiter-rios/',
                    'https://github.com/JoseSleiter/'
                ]
            });
        }
        next(err);
    }
}

export { HandleInternalError };