import { Schema, model } from 'mongoose';
import { ContactInterface } from '../interfaces/interfaces';

const contactClientschema = new Schema<ContactInterface["client"]>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
})

export const contactSchema = new Schema<ContactInterface>({
  date: { type: String, required: true },
  client: { type: contactClientschema, required: true },
  subject: { type: String, required: true },
  comment: { type: String, required: true },
  archived: { type: Boolean, required: true }
});

export const contactModel = model<ContactInterface>('Contact', contactSchema);