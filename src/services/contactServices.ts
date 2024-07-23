import { ContactInterface } from '../interfaces/interfaces';
import { contactModel } from '../schemas/contactSchema';

export class Contact {
    static async getContactList(){
        const allContact = await contactModel.find();
        return allContact;
    }

    static async getContact(id:string){
        const contact = contactModel.findById(id);
        if (!contact) 
            throw new Error('Cannot find contact');
        return contact;
    }

    static async createContact(contact:ContactInterface){
        const newContact = new contactModel({ ...contact });
        const insertedContact = await newContact.save();
        return insertedContact;
    }

    static async updateContact(contact:ContactInterface){
        const id = contact._id;
        await contactModel.updateOne({ id }, contact);
        const updatedContact = await contactModel.findById(id);
        return updatedContact;
    }

    static async deleteContact(id:string){
        const deletedContact = await contactModel.findByIdAndDelete(id);
        if (!deletedContact) 
            throw new Error(`Cannot delete contact because it doesn't exist`);
        return deletedContact;
    }
}
