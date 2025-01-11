import { connect } from 'mongoose';
import { config } from 'dotenv';

config();

const connectDB = async () => {
    await connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.error('MongoDB connection error:', error));
};

export default connectDB;
