const { model, Schema } = require('../connection');

const reviewSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Kit', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    images: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('Review', reviewSchema);
