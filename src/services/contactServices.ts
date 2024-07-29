import { ContactInterface } from '../interfaces/interfaces';
import { contactModel } from '../schemas/contactSchema';
import { APIError } from '../utils/utils';

export class Contact {
    static async getContactList(){
        const allContact = await contactModel.find();
        return allContact;
    }

    static async getContact(id:string){
        const contact = await contactModel.findById(id);
        if (!contact) 
            throw new APIError('Cannot find contact', 404, true);
        return contact;
    }

    static async createContact(contact:ContactInterface){
        try {
            const newContact = new contactModel({ ...contact });
            const insertedContact = await newContact.save();
            return insertedContact;
        } catch (error) {
            throw new APIError('Unexpected error while creating new contact', 500, true);
        }
    }

    static async updateContact(contact:ContactInterface){
        try {
            const id = contact._id;
            await contactModel.updateOne({ id }, contact);
            const updatedContact = await contactModel.findById(id);
            return updatedContact;
        } catch (error) {
            throw new APIError('Unexpected error while updating contact, make sure that the contact exist in the Database', 500, true);
        }
    }

    static async deleteContact(id:string){
        const deletedContact = await contactModel.findByIdAndDelete(id);
        if (!deletedContact) 
            throw new APIError('Cannot delete contact because it does not exist', 404);
        return deletedContact;
    }
}
