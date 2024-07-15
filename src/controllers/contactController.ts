import express, { NextFunction, Request, Response} from "express";
const router = express.Router();
import { ContactInterface } from "../interfaces/interfaces";
import { Contact } from "../services/contactServices";

router.get('/', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    const rooms: ContactInterface[] = Contact.getContactList();
    return res.json({rooms});
})

router.get('/:id', (req:Request, res:Response) => {
    const contact: ContactInterface = Contact.getContact(+req.params.id);
    return res.json({contact});
})

router.post('/', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP create contact");
})

router.patch('/:id', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP edit contact");
})

router.delete('/:id', (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP delete contact");
})

module.exports = router;