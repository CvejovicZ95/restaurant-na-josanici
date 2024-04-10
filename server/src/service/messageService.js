import { Message } from '../models/messageContactSchema.js';

export const createMessages = async (firstLastName, email, phoneNumber, question) => {
  try {
    const newMessage = new Message({ firstLastName, email, phoneNumber, question });
    await newMessage.save();
    return newMessage;
  } catch (error) {
    throw new Error('Error creating message');
  }
};

export const getAllMessages = async () => {
  try {
    const allMessages = await Message.find();
    return allMessages;
  } catch (error) {
    throw new Error('Error getting messages');
  }
};

export const deleteMessageById = async (messageId) => {
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      throw new Error('Message not found');
    }
    message.deleted = true;
    await message.save();
  } catch (error) {
    throw new Error('Error deleting message');
  }
};
