import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";

export const register = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ msg: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		const payload = {
			user: {
				id: newUser.id,
			},
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

		res.status(200).json({ token, msg: "User registered successfully" });
	} catch (err) {
		console.error(err);
	}
};
