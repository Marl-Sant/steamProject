const express = require("express");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const {
  Review,
  ProfileComment,
  Post,
  ReviewComment,
  Community,
  Game,
  Ownership,
} = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  // check('username')
  //   .exists({checkFalsy: true})
  //   .isLength({ min: 2 })
  //   .withMessage('Please provide a first name with at least 2 characters.'),
  // check('lastName')
  //   .exists({checkFalsy: true})
  //   .isLength({ min: 2 })
  //   .withMessage('Please provide a last name with at least 2 characters.'),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  // check('username')
  //   .not()
  //   .isEmail()
  //   .withMessage('Username cannot be an email.'),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Get relative information by userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const userInfo = await User.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        model: Review,
        include: [
          {
            model: Game,
            attributes: ["id", "title", "headerImage"],
          },
        ],
        order: [["createdAt", "DESC"]],
      },
      {
        model: Post,
        include: {
          model: Community,
          include: {
            model: Game,
            attributes: ["id", "title"],
          },
        },
      },
      {
        model: ProfileComment,
        as: "commentsReceived",
        include: {
          model: User,
          as: "commenter",
        },
      },
      {
        model: ProfileComment,
        as: "commentsMade",
        include: {
          model: User,
          as: "profileOwner",
        },
      },
      { model: ReviewComment },
      {
        model: Ownership,
        include: {
          model: Game,
        },
      },
    ],
    order: [[{ model: Ownership }, "createdAt", "DESC"]],
  });
  res.json(userInfo);
});

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, country } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email,
    username,
    country,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

router.put("/", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const { username, firstName, lastName, country, bio, profilePic } = req.body;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  user.username = username;
  user.firstName = firstName;
  user.lastName = lastName;
  user.country = country;
  user.bio = bio;
  user.profilePic = profilePic;

  return res.json({
    user: user,
  });
});

router.delete("/", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  await user.destroy();

  return res.json({
    message: "Account successfully deleted",
  });
});

module.exports = router;
