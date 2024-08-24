import "dotenv/config";
import mongoose from "mongoose";

const env = process.env;

const url = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@cluster0.gazkyrg.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

try {
  mongoose.connect(url);
} catch (error) {
  console.log(error);
}

export default mongoose;
