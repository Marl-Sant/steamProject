// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const gamesRouter = require("./games.js");
const communityRouter = require("./communities.js");
const commentRouter = require("./comments.js");
const postRouter = require("./posts.js");
const profileCommentsRouter = require("./profile-comments.js"); 
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/games", gamesRouter);

router.use("/communities", communityRouter);

router.use("/reviews", commentRouter);

router.use("/posts", postRouter);

router.use("/users", profileCommentsRouter);



module.exports = router;
