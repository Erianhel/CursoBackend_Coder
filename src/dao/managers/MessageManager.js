import { messagesModel } from "../models/messages.model.js";

export default class MessagesManager {
  getAllMessages = async () => {
    try {
    } catch (error) {
      return "Error en la ejecución", error;
    }
    const messages = await messagesModel.find().lean();
    return messages;
  };

  addMessages = async (message) => {
    try {
      const messageAdded = await messagesModel.create(message);
      return { message: `message added: ${messageAdded}` };
    } catch (error) {
      return "Error en la ejecución", error;
    }
  };
}
