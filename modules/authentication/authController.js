const User = require('../user/userModel');
const { generateToken } = require('./authService');

// User Register
exports.register = async (req, res, next) => {
  console.log('registering user');
  const { firstName, lastName, email, password, phoneNumber, about, photo, location } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      ;
      return next({ messageKey: 'error.user_exists' });
    }

    user = new User({ firstName, lastName, email, password, phoneNumber, about, photo, location });

    await user.save();
    console.log('User registered successfully');

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
};

// User Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      ;
      return next({ messageKey: 'error.user_not_found' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      ;
      return next({ messageKey: 'error.wrong_password' });
    }

    const token = generateToken(user);
    res.json({ user,token });
    console.log('User logged in successfully');
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
};
