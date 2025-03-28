const express = require('express');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const {
  handleValidationErrors,
} = require('../../utils/validation');

const {
  setTokenCookie,
  requireAuth,
} = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('firstName')
      .exists({checkFalsy: true})
      .isLength({ min: 2 })
      .withMessage('Please provide a first name with at least 2 characters.'),
    check('lastName')
      .exists({checkFalsy: true})
      .isLength({ min: 2 })
      .withMessage('Please provide a last name with at least 2 characters.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName, city, state, bio, profilePic } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, firstName, lastName, city, state, bio, profilePic, hashedPassword });
  
      const safeUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

router.put("/", requireAuth, async (req, res) => {
  const userId = req.user.id

  const {username, firstName, lastName, city, state, bio, profilePic} = req.body
  const user = await User.findOne({
    where: {
      id: userId
    }
  })

  user.username = username
  user.firstName = firstName
  user.lastName = lastName
  user.city = city
  user.state = state
  user.bio = bio
  user.profilePic = profilePic

  return res.json({
    user: user
  });
})

router.delete("/", requireAuth, async (req, res) => {
  const userId = req.user.id

  const user = await User.findOne({
    where: {
      id: userId
    }
  })

  await user.destroy()

  return res.json({
    message: "Account successfully deleted"
  })
})

module.exports = router;
