import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// import morgan from "morgan";
import path from "path";
import { Server } from "socket.io";
import { createServer } from "http";

import { conn } from "./Database/conn.js";
import { router } from "./Routes/routes.js";
import { socketHandler } from "./SocketHandler/socket-handler.js";
import { notFound } from "./Middleware/page-not-found.middleware.js";
import { validateToken } from "./Middleware/token-validation-socket.middleware.js";

dotenv.config();

const app = express();
const server = createServer(app);
export const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

app.use(express.json());
app.use(cors({ origin: "*" }));
// app.use(morgan("dev"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(router);
app.use(notFound);

const serverStart = async () => {
	const PORT = process.env.PORT as string;
	const DB_USER = process.env.DB_USER as string;
	const DB_PASSWORD = process.env.DB_PASSWORD as string;

	if (!PORT) {
		console.log("\x1b[31m%s\x1b[0m", "Server start error\nany port has been specified");
		return;
	}
	try {
		console.clear();
		console.log("Wait...");
		await conn(DB_USER, DB_PASSWORD);
		server.listen(PORT);
		socketStart();
		console.clear();
		console.log(
			"\x1b[32m%s\x1b[0m",
			`Server has been started\nPORT: ${PORT}\nURL: http://localhost:${PORT}`
		);
	} catch (error) {
		console.clear();
		console.log("\x1b[31m%s\x1b[0m", "Server error:");
		console.error(error);
		server.close(() => process.exit(1));
	}
};

const socketStart = () => {
	io.use(validateToken);
	io.on("connection", (socket) => {
		socketHandler(socket, io);
	});
};

serverStart();
