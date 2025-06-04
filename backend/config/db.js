import mongoose  from "mongoose";

const connectDb  = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_URL);
        console.log("Db connected successfully");
    }
    catch(error){
        console.log("Unable to connect to the db");
    }
}

export default connectDb;