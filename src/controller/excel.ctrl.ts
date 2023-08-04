import { Request, Response } from "express";
import { excelToJson } from "../mapping/excel.map";
import * as fs from "fs";
import {
  errorDeleteFile,
  fileMissing,
  fileNameMissing,
  successDeleteFile,
} from "../messages/messages";
import { prepareToInsert } from "../resolver/excel.rsv";

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: fileMissing });
  }
  const file = req.file.path;
  const splitname = req.file?.originalname.split(".");
  const extension = splitname[splitname.length - 1];
  const { title, description, ...body} = req.body;
  if (extension !== "xlsx") {
    return res.status(400).json({ error: fileNameMissing("excel") });
  }
  
  const objExcel = {
    title,
    description,
    employees: excelToJson(file, 0),
    gifts: excelToJson(file, 1),
  }

  try {
    fs.unlink(file, (err) => {
      if (err) {
        throw new Error(`${errorDeleteFile} ${err}`)
      } 
      console.log(`${successDeleteFile} ${file}`);
    });
  } catch (error: any) {
    res.status(500).json({ error });
  }

  return prepareToInsert(res, objExcel);
};

export const startGame = (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    msg: "Juego iniciado"
  })
}
