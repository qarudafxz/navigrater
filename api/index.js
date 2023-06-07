import express from "express";
import cors from "cors";
import morgan from "morgan";
import { runDb } from "./database/runDb.js";
import { authRouter } from "./routes/auth.js";
import { rateRouter } from "./routes/rating.js";

const PORT = 3001 || process.env.PORT;

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.use("/api/auth", authRouter);
app.use("/api/rate", rateRouter);

try {
	runDb();
} catch (err) {
	console.error(err);
} finally {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

export default app;
