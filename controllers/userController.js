import User from '../models/User.js';

export async function updateUser(req, res) {
  const { userId, email, fullName, age, preferences, gender } = req.body;
  try{
    console.log(userId, email, fullName, age, preferences, gender);
    const user = await User.findOne({ uid: userId });
    if (!user) {
      const newUser = new User({ uid: userId, email: email, fullname: fullName, age: age, preferences: preferences, gender: gender });
      await newUser.save();
      return res.status(201).json(newUser);
    }
    user.email = email;
    user.fullname = fullName;
    user.age = age;
    user.preferences = preferences;
    user.gender = gender;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProfile(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
}

export default { updateUser, getProfile };
