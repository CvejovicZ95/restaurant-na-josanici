import Message from '../models/messageContactSchema.js'

export const createMessage=async(req,res)=>{
  try{
    const {firstLastName,email,phoneNumber,question}=req.body;

    const newMessage=new Message({
      firstLastName,
      email,
      phoneNumber,
      question
    })

    await newMessage.save()

    res.status(201).json(newMessage)
  }catch(error){
    console.error('Error in createMessage controller:', error.message);
    res.status(500).json('Server error');
  }
}

export const getMessages=async(req,res)=>{
  try{
    const allMessages=await Message.find()
    res.status(200).json(allMessages)
  }catch(error){
    console.error('Error in getReservations controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.deleted = true;
    await message.save();

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error in deleteMessage controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
