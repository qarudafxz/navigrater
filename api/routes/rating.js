import express from "express";

import { addRating, getRatings, getMyRatings } from "../controllers/rate.js";

const router = express.Router();

router.post("/", addRating);
router.get("/get-rates/", getRatings);
router.get("/get-rates/:id", getMyRatings);

export { router as rateRouter };
