import express, { NextFunction, Request, Response} from "express";
import { ContactInterface } from "../interfaces/interfaces";
import { Contact } from "../services/contactServices";
import { authenticateToken } from "../middlware/auth";
const router = express.Router();

router.get('/', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    const rooms: ContactInterface[] = Contact.getContactList();
    return res.json({rooms});
})

router.get('/:id', authenticateToken, (req:Request, res:Response) => {
    const contact: ContactInterface = Contact.getContact(+req.params.id);
    return res.json({contact});
})

router.post('/', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP create contact");
})

router.patch('/:id', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP edit contact");
})

router.delete('/:id', authenticateToken, (req:Request, res:Response, next: NextFunction) => {
    console.log(req+""+res+""+next)
    return res.send("WIP delete contact");
})

module.exports = router;