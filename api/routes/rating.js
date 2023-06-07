import express from "express";

import {
	addRating,
	getRatings,
	getMyRatings,
	deleteMyRating,
	updateRating,
} from "../controllers/rate.js";

const router = express.Router();

router.post("/", addRating);
router.delete("/delete/:id", deleteMyRating);
router.get("/get-rates/", getRatings);
router.get("/get-rates/:id", getMyRatings);
router.put("/update/:id", updateRating);

export { router as rateRouter };
