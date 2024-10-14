
const mongoose = require('mongoose');


const rateSchema = new mongoose.Schema({
    writer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    stars: { type: Number, min: 1, max: 5 },
    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

const Rate = mongoose.model('Rate', rateSchema);
module.exports = Rate;