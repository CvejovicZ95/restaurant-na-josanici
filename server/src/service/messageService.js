import { Message } from '../models/messageContactSchema.js';
import { logger } from '../../logger.js';

export const createMessages = async (firstLastName, email, phoneNumber, question) => {
  try {
    const newMessage = new Message({ firstLastName, email, phoneNumber, question });
    await newMessage.save();

    logger.info('Message created successfully');
    return newMessage;
  } catch (error) {
    logger.error('Error creating message:', error.message);
    throw new Error('Error creating message');
  }
};

export const getAllMessages = async () => {
  try {
    const allMessages = await Message.find();
    return allMessages;
  } catch (error) {
    logger.error('Error getting messages:', error.message);
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
    logger.info('Message deleted successfully');
  } catch (error) {
    logger.error('Error deleting message:', error.message);
    throw new Error('Error deleting message');
  }
};
