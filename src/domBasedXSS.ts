import { Request, Response } from "express"

export const domXSS = async (req: Request, res: Response) => {
    res.render("domXSS")
}

export const domXSSsafe = async (req: Request, res: Response) => {
    res.render("domXSS-safe")
}
export const domXSS2 = async (req: Request, res: Response) => {
    res.render("domXSS2")
}
export const domXSS2safe = async (req: Request, res: Response) => {
    res.render("domXSS2-safe")
}