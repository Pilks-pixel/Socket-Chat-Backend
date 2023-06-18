const express = require("express");
const router = express.Router();
const messageControllers = require("../controllers/message");

router.post("/message/create", messageControllers.addMessages);

router.post("/messages", messageControllers.allMessages);

router.put("/message/:id/update", messageControllers.updateMessage);

router.delete("/message/:id/delete", messageControllers.deleteMessages);

module.exports = router;
