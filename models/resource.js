const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    avatar: String,
    thumbnail: String,
    cloudinary_id: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

ResourceSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Resource', ResourceSchema);