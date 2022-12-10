import e from "connect-flash";
import { NextFunction } from "express";

export const isAuth = (req: any, res: any, next: NextFunction) => {
  if (!req?.user) {
    res.status(401).redirect("/");
  } else {
    next();
  }
};
