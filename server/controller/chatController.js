import ChatModel from "../models/ChatModel.js";
import MessageModel from "../models/MessageModel.js";
import hostModel from '../models/hostModel.js'; // Adjust the path accordingly

export const createChat = async (req, res) => {

     
        const newChat = new ChatModel({
        userId: req.body.userId, // Corrected property name
        hostId: req.body.hostId, // Corrected property name
    });
    try {
        const result = await newChat.save();
        res.json({ err: false, result });
    } catch (error) { 
        console.log(error);
        res.json({ err: true });
    }
}; 

export const userChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            userId: req.params.userId,
        }).populate('hostId'); // Use 'hostId' instead of 'HostId'

        const messages = await MessageModel.aggregate([
            {
                $group: {
                    _id: "$chatId", 
                    lastMessage: { $last: "$text" }
                }
            }
        ]);

        let lastMessage = {};
        messages.map((item, index) => {
            lastMessage[item._id] = item.lastMessage;
        });
        res.json({ err: false, chat, lastMessage });
    } catch (error) {
        console.log(error);
        res.json({ err: true });
    }
};

export const hostChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            hostId: req.params.hostId,
        }).populate('userId');

        
        const messages= await MessageModel.aggregate([
            {
                $group: {
                    _id: "$chatId",
                    lastMessage: { $last: "$text" }
                }
            }
        ])
        let lastMessage={}
        messages.map((item, index)=>{ 
            lastMessage[item._id]=item.lastMessage
        })
        res.json({ err: false, chat, lastMessage })
    } catch (error) {
        res.json({ err: true });

    }
};

export const findChat = async (req, res) => {

    try {
        let chat = await ChatModel.findOne({
            userId: req.params.userId,
            hostId: req.params.hostId
        }).populate('hostId').populate('userId')
        if (!chat) {
            chat = await ChatModel.findOneAndUpdate({
                userId: req.params.userId,
                hostId: req.params.hostId
            },{
                $set:{
                    userId: req.params.userId,
                    hostId: req.params.hostId
                }
            },{upsert:true}
            ).populate('hostId').populate('userId')
        }
        res.json({ err: false, chat })
    } catch (error) {
        console.log(error)
        res.json({ err: true, message:"server error" });
    }
};