import { NextFunction, Request, Response } from "express"

// A custom middleware that logs requests
export const logRequests = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method}: ${req.url}`)
    next()
}
