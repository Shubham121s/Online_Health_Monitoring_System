const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    securityQuestion: { type: String, required: true },
    securityAnswer: { type: String, required: true },
    userData: {
        date: { type: [String], default: [] },
        activity: { type: [String], default: [] },
        weight: { type: [Number], default: [] },
        minutes: { type: [Number], default: [] },
        BodyTemp: { type: [Number], default: [] },
        HeartRate: { type: [Number], default: [] }
    }
});

module.exports = mongoose.model('User', userSchema);
