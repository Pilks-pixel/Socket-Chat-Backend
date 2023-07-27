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
			image: {
				type: String,
				default:''
			},
			title: {
				type: String,
				default:''
			}
        },
        emoji: {
            liked: {
                type: Boolean,
                default: false
            },
            laughed: {
                type: Boolean,
                default: false
            },
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
		secondaryId: {
            type: String,
            required: true,
        },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Message", messageSchema);
