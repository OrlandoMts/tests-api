import { Request, Response } from "express";
import { somethingWentWrong, succesUploadFile } from "../messages/messages";
import { RaffleItf } from "../interface/excel.itf";

const ModelRaffle = require("../model/raffle.mod");

export const prepareToInsert = async (res: Response, obj: RaffleItf) => {
  try {
    const savedCollection = await ModelRaffle.create(obj);

    return res.json({ message: succesUploadFile, savedCollection });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al guardar la colección en la base de datos" });
  }
};

export const playGame = async (req: Request, res: Response) => {
  try {
    const { _id: oid } = req.params;
    let gitfToShow;
    const raffle = await ModelRaffle.findById(oid).exec();

    if (!raffle) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }
    const gifts = raffle.gifts;
    const employees = raffle.employees;

    const availableEmployees = employees.filter(
      (employee: any) => employee.canPlay
    );

    if (availableEmployees.length > 0) {
      const randomEmployeeIndex = Math.floor(
        Math.random() * availableEmployees.length
      );
      const randomEmployee = availableEmployees[randomEmployeeIndex];
      randomEmployee.canPlay = false;

      if (gifts.length > 0) {
        const availableGift = gifts.find((gift: any) => gift.isAvailable);
        gitfToShow = availableGift;

        if (!availableGift) {
          return res.json({ message: "Premios terminados" });
        }
        availableGift.isAvailable = false;
        // Agrega el objeto de regalo a la propiedad "winners"
        raffle.winners.push({
          gift: availableGift,
          winner: randomEmployee, // Aquí puedes establecer el objeto del ganador si es necesario
        });
        await raffle.save();
      }
    } else {
      return res.json({ message: "Juego terminado" });
    }
    return res.json({ message: "Juego iniciado", raffle });
  } catch (error) {
    return res.status(500).json({ error: somethingWentWrong });
  }
};

export const getGift = async (req: Request, res: Response) => {
  try {
    const { _id: oid } = req.params;
    const raffle: RaffleItf = await ModelRaffle.findById(oid);
    if (!raffle) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }
    const { gifts } = raffle;
    const availableGift = gifts.find((gift: any) => gift.isAvailable);

    return res.json({ message: "Obteniendo el regalo", availableGift });
  } catch (error) {
    return res.status(500).json({ error: somethingWentWrong });
  }
};
