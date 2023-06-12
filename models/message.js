const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
	{
		message: {
			text: {
				type: String,
				required: true,
			},
		},
        gifUrl: {
            type: String,
            default:''
        },
		users: Array,
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		time: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Message", messageSchema);
