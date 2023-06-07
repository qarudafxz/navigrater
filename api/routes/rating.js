import express from "express";

import {
	addRating,
	getRatings,
	getMyRatings,
	deleteMyRating,
} from "../controllers/rate.js";

const router = express.Router();

router.post("/", addRating);
router.delete("/delete/:id", deleteMyRating);
router.get("/get-rates/", getRatings);
router.get("/get-rates/:id", getMyRatings);

export { router as rateRouter };
