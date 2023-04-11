import {model, Schema} from 'mongoose';

const pickupPointSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
});

export default model('pickupPointModel', pickupPointSchema);