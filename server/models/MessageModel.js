import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // This option adds createdAt and updatedAt fields
});

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
