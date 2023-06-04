export const buildUrl = (path) => {
	return process.env.NODE_ENV === "development"
		? `http://localhost:3001/api/${path}`
		: `/api/${path}`;
};
