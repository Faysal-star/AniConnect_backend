import Post from '../models/Post.js';

export async function createPost(req, res) {
  const { userId, movie, content } = req.body;
  try {
    const post = new Post({ user: userId, movie, content });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await Post.find()
      .populate('user', 'fullName')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
}

export default { createPost, getPosts };
    