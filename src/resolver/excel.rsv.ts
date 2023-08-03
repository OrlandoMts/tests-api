// TODO: Insertar en la bd, crear un modelo para los empleados

import { Response } from "express";
import { succesUploadFile } from "../messages/messages";
import { RaffleItf } from "../interface/excel.itf";

const ModelRaffle = require("../model/raffle.mod");

export const prepareToInsert = async (res: Response, obj: RaffleItf) => {
  try {

    const savedCollection = await ModelRaffle.create(obj);

    return res.json({message: succesUploadFile, savedCollection});
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al guardar la colección en la base de datos" });
  }
}