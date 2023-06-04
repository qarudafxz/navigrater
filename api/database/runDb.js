import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const runDb = () => {
	mongoose
		.connect(process.env.DB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		.then(() => {
			console.log("MongoDB Connection Established");
		});
};
