import brcypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: "User does not exist" });
		}

		const isMatch = await brcypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ msg: "Incorrect password" });
		}

		const payload = {
			user: {
				id: user.id,
			},
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

		res.status(200).json({ token, user, msg: "User logged in successfully" });
	} catch (err) {
		console.error(err);
	}
};
