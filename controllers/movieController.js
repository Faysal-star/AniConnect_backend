import User from '../models/User.js';
import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const movieController = {
    // Get movies by genre
    getMoviesByGenre: async (req, res) => {
        try {
            const { genreId } = req.params;
            const response = await axios.get(`${BASE_URL}/discover/movie`, {
                params: {
                    api_key: TMDB_API_KEY,
                    with_genres: genreId,
                    language: 'en-US',
                    sort_by: 'popularity.desc',
                    page: 1
                }
            });

            res.json(response.data.results);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching genre movies', error: error.message });
        }
    },

    // Get top rated movies
    getTopMovies: async (req, res) => {
        try {
            const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    page: 1
                }
            });

            res.json(response.data.results);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching top movies', error: error.message });
        }
    },

    // Search movies
    searchMovies: async (req, res) => {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({ message: 'Search query is required' });
            }

            const response = await axios.get(`${BASE_URL}/search/movie`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    query: query,
                    page: 1
                }
            });

            res.json(response.data.results);
        } catch (error) {
            res.status(500).json({ message: 'Error searching movies', error: error.message });
        }
    },

    // Add movie to favorites
    addToFavorites: async (req, res) => {
        try {
            const { uid, movieId } = req.body;

            if (!movieId) {
                return res.status(400).json({ message: 'Movie ID is required' });
            }

            // Fetch movie details from TMDB
            const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US'
                }
            });

            const movieData = {
                id: movieId,
                title: response.data.title,
                poster_path: response.data.poster_path,
                release_date: response.data.release_date,
                rating: response.data.vote_average
            };

            // Update user's favorite movies
            const user = await User.findOne({ uid });
            
            // Check if movie already exists in favorites
            const movieExists = user.favoriteMovies.some(movie => movie.id === movieId);
            if (movieExists) {
                return res.status(400).json({ message: 'Movie already in favorites' });
            }

            user.favoriteMovies.push(movieData);
            await user.save();

            res.json({ message: 'Movie added to favorites', movie: movieData });
        } catch (error) {
            res.status(500).json({ message: 'Error adding movie to favorites', error: error.message });
        }
    }
};

export default movieController;
