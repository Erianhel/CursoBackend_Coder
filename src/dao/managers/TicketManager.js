import { ticketModel } from "../models/tickets.model.js"

export default class TicketManager{


    createTicket = async (amount, purchaser) =>{
        const currentDate = new Date();
        const uniqueCode = currentDate.getTime().toString(36);
        const ticket = {
            code : uniqueCode,
            purchaser,
            amount
        }
        const newTicket = await ticketModel.create(ticket);
        return newTicket;
    }
}