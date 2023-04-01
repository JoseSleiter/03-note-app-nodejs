import {
    Request,
    Response,
    NextFunction
} from 'express';

class HandleNotFoundPath {
    public check(
        req: Request,
        res: Response,
        _next: NextFunction
    ): void | any {
        return res.status(400).send({
            error: `Unknown resource to path: ${req.originalUrl}`,
            socialNetwork: [
                'If you need a FullStack Developer for your projects, contact me by linkedin',
                'https://www.linkedin.com/in/jose-sleiter-rios/',
                'https://github.com/JoseSleiter/'
            ]
        });
    }

}

export { HandleNotFoundPath };