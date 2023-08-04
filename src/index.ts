const express = require("express");
const multer = require("multer");
const app = express();
const upload = multer({ dest: "uploads/" });
import * as bodyParser from "body-parser";
const ModelUser = require("./model/user.mod");
const ModelRaffle = require("./model/raffle.mod");

import { Request, Response } from "express";
import { startGame, uploadFile } from "./controller/excel.ctrl";
import { check } from "express-validator";
import { checkFieldsMidd, ckId } from "./middleware/check";
require("./db/connection");

app.use(bodyParser.json());

// Ruta para cargar un archivo
app.post(
  "/upload",
  [
    upload.single("file"),
    check("title", "el titulo es requerido").notEmpty(),
    check("description", "el titulo es requerido").notEmpty(),
    checkFieldsMidd,
  ],
  (req: Request, res: Response) => {
    uploadFile(req, res);
  }
);

// Ruta para cargar un archivo
app.get(
  "/start/:_id",
  [
    check("_id", "No es un id valido").isMongoId(),
    check("_id").custom((val) => ckId(val, ModelRaffle, "sorteo")),
    checkFieldsMidd,
  ],
  (req: Request, res: Response) => {
    startGame(req, res);
  }
);

app.post("/new", async (req: Request, res: Response) => {
  const { name, age, email, ...body } = req?.body;
  const objUser = {
    name,
    age,
    email,
  };
  try {
    // Guardar la colección en la base de datos
    const savedCollection = await ModelUser.create(objUser);

    return res.json(savedCollection);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al guardar la colección en la base de datos" });
  }
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
