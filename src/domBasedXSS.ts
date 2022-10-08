import { Request, Response } from "express";

export const domXSS = async (req: Request, res: Response, isSafe: boolean) => {
    res.render("domXSS", { isSafe });
};

export const domXSS2 = async (req: Request, res: Response, isSafe: boolean) => {
    res.render("domXSS2", { isSafe });
};
