import express, { NextFunction, Request, Response} from "express";
import { Contact } from "../services/contactServices";
const router = express.Router();

router.get('/', async (_req:Request, res:Response, next:NextFunction) => {
    try {
        const contacts = Contact.getContactList();
        return res.json({contacts});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

router.get('/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const contact = Contact.getContact(req.params.id);
        return res.json({contact});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

router.post('/', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const contact = await Contact.createContact(req.body);
        return res.json({contact});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

router.patch('/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const contact = await Contact.updateContact(req.body);
        return res.json({contact});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

router.delete('/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const contact = await Contact.deleteContact(req.params.id);
        return res.json({contact});
    } catch (error) {
        next(error)
        return res.json({});
    }
})

module.exports = router;