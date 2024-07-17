import express, { Request, Response} from "express";
import { ContactInterface } from "../interfaces/interfaces";
import { Contact } from "../services/contactServices";
const router = express.Router();

router.get('/', (_req:Request, res:Response) => {
    const contacts: ContactInterface[] = Contact.getContactList();
    return res.json({contacts});
})

router.get('/:id', (req:Request, res:Response) => {
    const contact: ContactInterface = Contact.getContact(+req.params.id);
    return res.json({contact});
})

router.post('/', (_req:Request, res:Response) => {
    return res.send("WIP create contact");
})

router.patch('/:id', (_req:Request, res:Response) => {
    return res.send("WIP edit contact");
})

router.delete('/:id', (_req:Request, res:Response) => {
    return res.send("WIP delete contact");
})

module.exports = router;