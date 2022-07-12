const express = require('express');
const { check } = require('express-validator');
const usersRepository = require('../../repository/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

// Middlewareを自作した場合
// const bodyParser = (req, res, next) => {
//   if (req.method === 'POST') {
//     req.on('data', (data) => {
//       const parsed = data.toString('utf8').split('&');
//       const formData = {};
//       for (const pair of parsed) {
//         const [key, value] = pair.split('=');
//         formData[key] = value;
//       }
//       req.body = formData;
//       next();
//     });
//   } else {
//     next();
//   }
// };

router.post(
  '/signup',
  [check('email').isEmail(), check('password'), check('passwordConfirmation')],
  async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepository.getOneBy({ email });
    if (existingUser) {
      return res.send('Email in use');
    }

    if (password !== passwordConfirmation) {
      return res.send('Passwords must match');
    }

    const user = await usersRepository.create({ email, password });
    req.session.userId = user.id;

    res.send('Account Created!');
  }
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out!');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepository.getOneBy({ email });
  if (!user) {
    return res.send('Invalid credentials.');
  }

  if (!(await usersRepository.comparePassword(user.password, password))) {
    return res.send('Invalid credentials.');
  }

  req.session.userId = user.id;

  res.send('You are logged in!');
});

module.exports = router;
