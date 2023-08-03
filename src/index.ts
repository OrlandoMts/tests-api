const express = require("express");
const multer = require("multer");
const app = express();
const upload = multer({ dest: "uploads/" });
import * as bodyParser from "body-parser";
const ModelUser = require("./model/user.mod");

import { Request, Response } from "express";
import { uploadFile } from "./controller/excel.ctrl";
require("./db/connection");

app.use(bodyParser.json());

// Ruta para cargar un archivo
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  uploadFile(req, res);
});

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
