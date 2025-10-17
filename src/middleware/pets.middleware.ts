import type { Request, Response, NextFunction } from 'express'

export const validateNumericId = (
    req: Request<{id: string}>,
    res: Response<{message: string}>,
    next: NextFunction
): void => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        res.status(400).json({message: "Pet ID must be a number"});
    } else {
        next();
    }
}

export const pleaseAuth = (
    req: Request<{}, unknown, {}, {password?: 'please'}>,
    res: Response<{message: string}>,
    next: NextFunction
): void => {
    const { password } = req.query;
    if (password !== 'please') {
        res.status(401).json({message: "Incorrect password for this route"});
    } else {
        next();
    }
}