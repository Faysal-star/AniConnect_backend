import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    poster_path: { type: String, required: true },
    release_date: { type: String, required: true },
    rating: { type: Number, required: true },
});

const userSchema = new Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    age: { type: Number, required: true },
    preferences: { type: String, required: true },
    favoriteMovies: { type: [movieSchema], default: [] },
    gender: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

const User = model('User', userSchema);

export default User;
