import mongoose from "mongoose";

const collectionName = "users";

const UserSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

export const User = mongoose.model(collectionName, UserSchema);
