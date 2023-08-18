import ChatModel from '../models/chatModel.js';
import messageModel from '../models/MessageModel.js';

export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;
  console.log("createChat");
  try {
    const newChat = new ChatModel({
      members: [senderId, receiverId],
    });
    const result = await newChat.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat', error });
  }
};
export const userChats=async(req,res)=>{
    console.log("userChats");
    console.log(req.params.userId );
    try {
        const chat =await ChatModel.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Error creating chat', error });
    }
}

export const findChat=async(req,res)=>{
    console.log("findChat");
    try {
        const chat=await ChatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json({ message: 'Error creating chat', error });
    }
}

export const addMessage=async(req,res)=>{
    console.log("addMessage");
    const {chatId,senderId,text}=req.body
    const message=new messageModel({
        chatId,senderId,text
    })
    try {
        const result=await message.save();
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: 'Error creating chat', error });
    }
}

export const getMessages=async(req,res)=>{
    console.log("getMessages");
    const {chatId}=req.params

    try {
        const result= await messageModel.find({chatId})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: 'Error creating chat', error });
    }

}
