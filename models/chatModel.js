const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            content: { type: String },
            timestamp: { type: Date, default: Date.now },
        }
    ],
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
