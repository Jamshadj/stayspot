import mongoose from 'mongoose';

const withdrawSchema = new mongoose.Schema({
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'host', // Reference to the User model (adjust the model name if needed)
    required: true
  },
  accountHolder: {
    type: String,
    required: true
  },
  accountNo: {
    type: Number,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
});

const WithdrawModel = mongoose.model('WithdrawRequest', withdrawSchema);

export default WithdrawModel;
