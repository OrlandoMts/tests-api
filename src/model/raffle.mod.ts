import { Schema } from "mongoose";
import { RaffleItf } from "../interface/excel.itf";

export const mongooseDB = require("mongoose");

const schema: Schema = new Schema<RaffleItf>({
  title: { type: String, required: true },
  description: { type: String, required: true },
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
  winners: [
    {
      gift: {
        idGift: { type: Number },
        name: { type: String },
        nameImg: { type: String },
        isAvailable: { type: Boolean, required: false, default: true },
      },
      winner: {
        idEmployee: { type: Number },
        name: { type: String },
        canPlay: { type: Boolean, required: false, default: true },
      },
    },
  ],
  status: { type: Boolean, required: false, default: true },
});

const ModelRaffle = mongooseDB.model("ModelRaffle", schema);

module.exports = ModelRaffle;
