import { Rating } from "../models/Rating.js";
import { User } from "../models/User.js";

export const addRating = async (req, res) => {
	const { owner, location } = req.body;

	try {
		const newRating = new Rating({
			owner,
			location,
		});

		await newRating.save();

		res.status(201).json(newRating);
	} catch (err) {
		console.error(err);
	}
};

export const getRatings = async (req, res) => {
	try {
		const ratings = await Rating.find({});
		if (!ratings) return res.status(404).json({ message: "No ratings found" });

		res.status(200).json(ratings);
	} catch (err) {
		console.log(err);
	}
};

export const getMyRatings = async (req, res) => {
	const { id } = req.params;
	try {
		const ratings = await Rating.find({ owner: id });
		if (!ratings) return res.status(404).json({ message: "No ratings found" });

		res.status(200).json(ratings);
	} catch (err) {
		console.log(err);
	}
};

export const deleteMyRating = async (req, res) => {
	try {
		const rate = await Rating.findOneAndDelete({ _id: req.params.id });
		if (!rate) return res.status(404).json({ message: "Rating not found" });

		res.status(200).json({ message: "Rating deleted" });
	} catch (err) {
		console.error(err);
	}
};

export const updateRating = async (req, res) => {
	const { id } = req.params;
	const { owner, location } = req.body;

	try {
		const updatedRating = await Rating.findOneAndUpdate({ _id: id });

		if (!updatedRating)
			return res.status(404).json({ message: "Rating not found" });

		const updateRating = new Rating({
			owner,
			location,
		});

		await updateRating.save();

		res.status(201).json({ updatedRating, message: "Rating updated" });
	} catch (err) {
		console.error(err);
	}
};
