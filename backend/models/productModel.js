import {model, Schema} from 'mongoose';

const productSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    variation: {
        type: String
    },
    rating: {
        type: Number
    },
    mainImage: {
        type: String,
        required: true
    },
    images: [String],
    category: [String]
});

export default model('productModel', productSchema);