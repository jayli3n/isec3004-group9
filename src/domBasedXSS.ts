import { Request, Response } from "express"

export const domXSS = async (req: Request, res: Response) => {
    res.render("domXSS")
}
