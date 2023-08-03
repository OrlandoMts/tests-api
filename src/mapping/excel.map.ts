import { Request, Response } from "express";
import * as xlsx from "xlsx";
import { Employees } from "../interface/excel.itf";

export const excelToJson = (file: any, book: number = 0): Array<any> => {
  const workbook = xlsx.readFile(file ?? "");
  const sheetName = workbook.SheetNames[book];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  return data as Array<any>
};
