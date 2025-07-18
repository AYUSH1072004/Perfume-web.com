import mongoose from 'mongoose';

const URL = 'mongodb://localhost:27017/perfume';

const connectDB = async () => {
    try {
       await mongoose.connect(URL);
       console.log('Connected to MongoDB');

    } catch (error) {
        console.log({message: "database error",error})
    }
}

export default connectDB;