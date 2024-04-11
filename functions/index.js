import { onRequest } from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";

export const helloWorld = onRequest((request, response) => {
	logger.info("Hello logs!", { structuredData: true, body: request.body });

	response.send("Hello from Firebase!");
});
