import { Schema, model } from 'mongoose';
import { UserInterface } from '../interfaces/interfaces';

export const userSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, required: true },
  positionName: { type: String, required: true },
  positionDescription: { type: String, required: true },
  date: { type: Date, required: true, default:new Date() },
  status: { type: Boolean, required: true, default:true },
  password: { type: String, required: true },
});

export const userModel = model<UserInterface>('User', userSchema);