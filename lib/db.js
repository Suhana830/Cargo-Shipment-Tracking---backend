import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully connected to DB");

    } catch (error) {
        console.log("Error in Connection");
        process.exit(1);
    }
}