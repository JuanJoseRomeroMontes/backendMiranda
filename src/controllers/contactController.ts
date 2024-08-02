import express, { NextFunction, Request, Response} from "express";
import { Contact } from "../services/contactServices";
const router = express.Router();

router.get('/', async (_req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const contacts = await Contact.getContactList();
        return res.json({contacts});
    } catch (error) {
        console.log("Booking not found controller")
        next(error)
    }
})

router.get('/:id', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const contact = await Contact.getContact(req.params.id);
        return res.json({contact});
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const contact = await Contact.createContact(req.body);
        return res.json({contact});
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const contact = await Contact.updateContact(req.body);
        return res.json({contact});
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req:Request, res:Response, next:NextFunction):Promise<Response<JSON> | void> => {
    try {
        const contact = await Contact.deleteContact(req.params.id);
        return res.json({contact});
    } catch (error) {
        next(error)
    }
})

module.exports = router;