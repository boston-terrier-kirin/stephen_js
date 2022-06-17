const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepository = require('./repository/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['h!}hkY}KHLh5kt4:'],
  })
);

app.get('/signup', (req, res) => {
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="passwordConfirmation" placeholder="password confirmation" />
            <button>Sign Up</button>
        </form>
    </div>  
  `);
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

app.post('/signup', async (req, res) => {
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
});

app.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out!');
});

app.get('/signin', (req, res) => {
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button>Sign In</button>
        </form>
    </div>  
  `);
});

app.post('/signin', async (req, res) => {
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

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
