const rateSchema = new mongoose.Schema({
    comment: { type: String },
    stars: { type: Number, min: 1, max: 5 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

const Rate = mongoose.model('Rate', rateSchema);
module.exports = Rate;