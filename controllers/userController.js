import User from '../models/User.js';

export async function updateUser(req, res) {
  const { userId, fullName, age, preferences } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { fullName, age, preferences },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
}

export async function getProfile(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select('-__v');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
}

export default { updateUser, getProfile };
