import { createMessages, getAllMessages, deleteMessageById } from '../service/messageService.js'

export const createMessage = async (req, res) => {
  try {
    const { firstLastName, email, phoneNumber, question } = req.body
    const newMessage = await createMessages(firstLastName, email, phoneNumber, question)
    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const getMessages = async (req, res) => {
  try {
    const allMessages = await getAllMessages()
    res.status(200).json(allMessages)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id
    await deleteMessageById(messageId)
    res.status(200).json({ message: 'Message deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}
