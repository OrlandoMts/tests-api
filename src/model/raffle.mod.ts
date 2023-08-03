import { Schema } from "mongoose";
import { RaffleItf } from "../interface/excel.itf";

export const mongooseDB = require("mongoose");

const schema: Schema = new Schema<RaffleItf>({
  employees: [
    {
      idEmployee: { type: Number },
      name: { type: String },
      canPlay: { type: Boolean, required: false, default: true },
    },
  ],
  gifts: [
    {
      idGift: { type: Number },
      name: { type: String },
      nameImg: { type: String },
      isAvailable: { type: Boolean, required: false, default: true },
    },
  ],
});

const ModelRaffle = mongooseDB.model("ModelRaffle", schema);

module.exports = ModelRaffle;
