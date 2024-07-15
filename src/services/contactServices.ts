import contactsJson from '../data/contactsData.json';
import { ContactInterface } from '../interfaces/interfaces';

export class Contact {
    static getContactList():ContactInterface[]{
        return contactsJson;
    }

    static getContact(id:number):ContactInterface{
        const contact: ContactInterface | undefined = contactsJson.find(contact => contact.id === id);
        if (!contact) 
            throw new Error('Cannot find contact');
        return contact;
    }

    static createContact(contact:ContactInterface):ContactInterface{
        //Add contact and return it
        return contact;
    }

    static updateContact(contact:ContactInterface):ContactInterface{
        //Update contact and return it
        return contact;
    }

    static deleteContact(id:number){
        //Delete contact
        console.log(id)
    }
}
