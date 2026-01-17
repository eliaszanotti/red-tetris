import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { ServerStateClass } from "./types/state.js";
import { setupSocketIO } from "./socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin:
			process.env.NODE_ENV === "production"
				? undefined
				: ["http://localhost:5173", "http://localhost:4173"],
		credentials: true,
	},
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(join(__dirname, "../../app/dist")));
}

setupSocketIO(io);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
