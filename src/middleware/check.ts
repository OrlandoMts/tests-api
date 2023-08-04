import { NextFunction, Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { Model, Types } from "mongoose";
import { MSG_TXT_INV, MSG_TXT_NOT_EXIST } from "../messages/messages";

export const checkFieldsMidd = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: Result = validationResult(req).formatWith(
    ({ msg }): string => msg
  );
  if (!errors.isEmpty())
    return res.status(400).json({
      ok: false,
      error: errors.array()[0],
    });

  next();
};

export const ckId = async (val: string, model: Model<Document> | any, msg: string = ""): Promise<void> => {
    try {
        if (val.length !== 0 && typeof val === "string") {
            const isvalid = Types.ObjectId.isValid(val);
            if (!isvalid) throw new Error(MSG_TXT_INV(msg));
            const exists = await model.findOne({ _id: val, status: true });
            if (!exists) throw new Error(MSG_TXT_NOT_EXIST(msg));
        }
    } catch (error: any) {
        throw new Error(error?.message || MSG_TXT_NOT_EXIST(msg));
    }
}
