const communitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isPublic: { type: Boolean, default: true },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;