import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'premium'],
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        default: null
    }
})

const userModel = mongoose.model(collection, schema);

export default userModel;