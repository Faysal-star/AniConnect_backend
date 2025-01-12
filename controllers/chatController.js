import User from '../models/User.js';
import Post from '../models/Post.js';
import ChatUtil from '../utils/gpt.js';

const chatController = {
    getRecommendations: async (req, res) => {
        try {
            const { uid, message } = req.body;

            const user = await User.findOne({ uid });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const userPosts = await Post.find({ uid });

            const favoriteMovies = user.favoriteMovies.map(movie => movie.title);
            const moviePosts = userPosts.map(post => ({
                title: post.movie.title,
                comment: post.content
            }));

            const prompt = `
                User Message: ${message}
                User Preferences: ${user.preferences}
                User's Favorite Movies: ${favoriteMovies.join(', ')}
                User's Movie Comments: ${moviePosts.map(p => `${p.title}: ${p.comment}`).join('; ')}

                Based on this information, recommend 5 to 6 movies. 
                Return ONLY a JSON array of movie titles, like this format:
                ["Movie Title 1", "Movie Title 2", "Movie Title 3"]
            `;
            console.log(prompt);

            let response = await ChatUtil.generateResponse(prompt);
            let movieList;

            try {
                movieList = JSON.parse(response.content);
                if (!Array.isArray(movieList)) {
                    throw new Error('Not an array');
                }
            } catch (error) {
                const retryPrompt = `
                    ${prompt}
                    IMPORTANT: Return ONLY a valid JSON array of strings. 
                    Example: ["Movie 1", "Movie 2", "Movie 3"]
                    No other text or formatting.
                `;
                response = await ChatUtil.generateResponse(retryPrompt);
                try {
                    movieList = JSON.parse(response.content);
                    if (!Array.isArray(movieList)) {
                        throw new Error('Not an array');
                    }
                } catch (error) {
                    return res.status(500).json({ 
                        message: 'Failed to generate valid recommendations',
                        error: error.message 
                    });
                }
            }

            res.json(movieList);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error generating recommendations', 
                error: error.message 
            });
        }
    }
};

export default chatController;
