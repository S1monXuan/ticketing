import { requireAuth, validateRequest } from '@s1mon-sgtickets/common';
import express, {Request, Response} from 'express'
import { body} from 'express-validator';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
    .not()
    .isEmpty()
    .withMessage('Title is Required'),

    body('price')
    .isFloat({gt: 0})
    .isEmpty()
    .withMessage('Price must grater than 0')
], validateRequest,
(req: Request, res: Response) => {
    res.sendStatus(200);
});

export {router as createTicketRouter}