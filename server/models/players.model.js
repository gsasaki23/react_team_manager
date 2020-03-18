// Import mongoose
const mongoose = require("mongoose");
// Repeating message vars
const requiredMsg = "{PATH} is required.";
const minlengthMsg = "{PATH} must be at least {MINLENGTH} characters.";

// Create Player Schema
const PlayerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, requiredMsg],
			minlength: [2, minlengthMsg]
        },
        position: {
			type: String,
        },
        status: {
			type: String,
			minlength: [2, minlengthMsg]
		},
        statusGameTwo: {
			type: String,
			minlength: [2, minlengthMsg]
		},
        statusGameThree: {
			type: String,
			minlength: [2, minlengthMsg]
		},
	},{ timestamps: true }
)

// Create model, registering Player Schema and creating "Players" collection when we insert to it
const Player = mongoose.model("Player",PlayerSchema);

// Export Player Model to be used in Controller
module.exports = Player;