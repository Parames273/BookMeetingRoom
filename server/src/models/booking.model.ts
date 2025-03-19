const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    sapId: {
        // type: Schema.Types.ObjectId,
        type: Number,
        ref: 'User',
        required: true
    },
    roomId: {
        // type: Schema.Types.ObjectId,
        type: String,
        ref: 'Room',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Rejected', 'Approved'],
        required: true,
        default: 'Pending'
    }
});

const bookingModel = mongoose.model('BookingHistory', bookingSchema);
export default bookingModel;

