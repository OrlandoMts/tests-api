import { Types } from "mongoose";

export interface Employees {
    _id?: string | Types.ObjectId;
    idEmployee: number;
    name: string;
    canPlay: boolean;
}

export interface Gifts {
    _id?: string | Types.ObjectId;
    idGift: number;
    name: string;
    nameImg: string;
    isAvailable: boolean;
}

export interface RaffleItf {
    _id?: string | Types.ObjectId;
    title: string;
    description: string;
    employees: Employees[];
    gifts: Gifts[];
    status?: boolean;
}