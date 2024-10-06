const User = require('../models/userModel');
const { generateToken } = require('./authService');

// User Register
exports.register = async (req, res) => {
  console.log('registering user');
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User Already exists' });
    }

    user = new User({ name, email, password });
    await user.save();
    console.log('User registered successfully');

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found while login' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'wrong password while login' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error while login'); 
  }
};
