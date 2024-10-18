import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Connect to MongoDB using the connection string from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        // Log the success message if connection is established
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        // Log error and exit the process if the connection fails
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Export the function to be used in other parts of the application
export default connectDB;
