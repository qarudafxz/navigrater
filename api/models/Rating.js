import mongoose from "mongoose";

const collectionName = "ratings";

const RatingSchema = mongoose.Schema(
	{
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		location: [
			{
				raterName: { type: String, required: true },
				name: { type: String, required: true },
				lat: { type: Number, required: true },
				lng: { type: Number, required: true },
				rating: { type: Number, required: true },
				comment: { type: String, required: true },
			},
		],
	},
	{ timestamps: true }
);

export const Rating = mongoose.model(collectionName, RatingSchema);
