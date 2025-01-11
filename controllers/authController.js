import User from '../models/User.js';

export async function auth(req, res) {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }
    res.json({ userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
}

export default { auth };
