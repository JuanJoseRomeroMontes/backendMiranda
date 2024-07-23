import express, { Request, Response} from "express";
import { Contact } from "../services/contactServices";
const router = express.Router();

router.get('/', async (_req:Request, res:Response) => {
    const contacts = Contact.getContactList();
    return res.json({contacts});
})

router.get('/:id', async (req:Request, res:Response) => {
    const contact = Contact.getContact(req.params.id);
    return res.json({contact});
})

router.post('/', async (req:Request, res:Response) => {
    const contact = await Contact.createContact(req.body);
    return res.json({contact});
})

router.patch('/:id', async (req:Request, res:Response) => {
    const contact = await Contact.updateContact(req.body);
    return res.json({contact});
})

router.delete('/:id', async (req:Request, res:Response) => {
    const contact = await Contact.deleteContact(req.params.id);
    return res.json({contact});
})

module.exports = router;