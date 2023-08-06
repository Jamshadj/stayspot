import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        allowNull: true
    },
    loginWithGoogle: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    blocked: {
        type: Boolean,
        default:false
    },
    image: {
        type: Object,
    },
    phoneNumber:{
        type:Number
    },
    wishlist:{
        type:Array
    }

})

const userModel = mongoose.model('userDetails', userSchema)
export default userModel;