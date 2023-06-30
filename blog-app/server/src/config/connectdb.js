import mongoose from "mongoose";

const connectDB =  async (DATABASE_URL) => {
    console.log('Connecting to database...');
    try{
        await mongoose.connect(DATABASE_URL);
        console.log('Connected to database');
    }catch(error){
        console.log(error);
    }
}

export default connectDB;