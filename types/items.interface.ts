import { Types } from "mongoose";
import { UserInterface } from './User.interface';

export interface ItemInterface {
    _id:Types.ObjectId;
    name:string;
    user?:UserInterface
}