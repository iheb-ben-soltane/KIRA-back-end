const User = require('../user/userModel');
const { generateToken } = require('./authService');

// User Register
//for now register retruns a token and user object
exports.register = async (req, res) => {
  console.log('registering user');
  const { firstName, lastName, email, password, phoneNumber, about, photo,location } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User Already exists' });
    }

    user = new User({ firstName, lastName, email, password, phoneNumber,about, photo,location });

    await user.save();
    console.log('User registered successfully');

    const token = generateToken(user);
    res.status(201).json({ user,token });
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
    console.log('User logged in successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error while login'); 
  }
};
