import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    poster_path: { type: String, required: true },
    release_date: { type: String, required: true },
    rating: { type: Number, required: true },
});

const postSchema = new Schema({
    uid: { type: String, required: true },
    movie: { type: movieSchema, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Post = model('Post', postSchema);

export default Post;

