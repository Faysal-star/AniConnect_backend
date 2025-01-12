import Post from '../models/Post.js';

const postController = {
    createPost: async (req, res) => {
        try {
            const { uid, movie, content } = req.body;

            const newPost = new Post({
                uid,
                movie: {
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                    rating: movie.rating
                },
                content
            });

            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ message: 'Error creating post', error: error.message });
        }
    },

    // Get all posts
    getPosts: async (req, res) => {
        try {
            const posts = await Post.find()
                .sort({ createdAt: -1 });
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching posts', error: error.message });
        }
    }
};

export default postController;
    