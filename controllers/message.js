const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Message = require("../models/message");

async function addMessages(req, res, next) {
	try {
		console.log(req.body);
		const { from, to, message, gif, timeStamp } = req.body;
		const data = await Message.create({
			message: { text: message },
			gifUrl: gif,
			users: [from, to],
			sender: from,
			time: timeStamp,
		});
		if (!data) {
			throw new Error("message failed to send: could not create message");
		}
		return res.status(201).json({ msg: "message added" });
	} catch (err) {
		next(err);
	}
}

async function allMessages(req, res, next) {
	try {
		const { from, to } = req.body;
		const getMessages = await Message.find({
			users: {
				$all: [from, to],
			},
		}).sort({ updatedAt: 1 });

		const showMessages = getMessages.map(msg => {
			return {
				fromSender: msg.sender.toString() === from,
				messageId: msg._id,
				message: msg.message.text,
				gif: msg.gifUrl,
				likeStatus: msg.emoji.liked,
				laughStatus: msg.emoji.laughed,
				timeStamp: msg.time,
			};
		});
		return res.status(200).json(showMessages);
	} catch (err) {
		next(err);
	}
}

	async function updateMessage(req, res, next) {
		try {
			console.log(req.body);
			const messageId = req.params.id;
			const {likeStatus, laughStatus} = req.body;
			const data = await Message.findOneAndUpdate({_id: messageId}, {emoji : {liked: likeStatus, laughed: laughStatus}});
			if (!data) {
				throw new Error("message failed to update: could not like or laugh at message");
			}
		return res.status(201).json(`Emoji at message ${data._id} updated`);
		} catch (err) {
			next(err);
		}
}

	async function deleteMessages(req, res, next) {
		try {
			const currentUser = req.params.id;
			const { deletedCount } = await Message.deleteMany({
				users: {
					$in: [currentUser],
				},
			});

			return res.status(200).json(`${deletedCount} messages deleted for ${currentUser}`);
		} catch (err) {
			next(err);
		}
}

module.exports = { addMessages, allMessages, updateMessage, deleteMessages };
