import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    role: { 
        type: String, 
        required: true, 
        enum: ['user', 'assistant'] 
    },
    content: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

const chatSchema = new Schema({
    uid: { 
        type: String, 
        required: true 
    },
    messages: [messageSchema],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

chatSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const Chat = model('Chat', chatSchema);

export default Chat;



