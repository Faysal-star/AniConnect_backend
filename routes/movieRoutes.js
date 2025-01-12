import express from 'express';
import movieController from '../controllers/movieController.js';

const router = express.Router();

router.get('/genre/:genreId', movieController.getMoviesByGenre);
router.get('/top', movieController.getTopMovies);
router.get('/search', movieController.searchMovies);
router.post('/addFav', movieController.addToFavorites);
router.post('/removeFav', movieController.removeFromFavorites);

export default router;
