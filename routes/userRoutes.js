const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");

// Register & Login (Create)
router.post("/register", userControllers.register);

router.post("/login", userControllers.login);

// CRUD routes
router.get(
	"/contact/:id",
	userControllers.authenticateToken,
	userControllers.user
);

router.get(
	"/contacts/:id",
	userControllers.authenticateToken,
	userControllers.allUsers
);

// /contact:id/update
router.put(
	"/avatar/:id",
	userControllers.authenticateToken,
	userControllers.update
);

router.delete(
	"/contact/:id/delete",
	userControllers.authenticateToken,
	userControllers.deleteUser
);

router.get("/", userControllers.authenticateToken, userControllers.hello);
module.exports = router;
