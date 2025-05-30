import path from "path";
import { Request, Response } from "express";

function serverFrontend(req: Request, res: Response) {
	res.sendFile(path.join(process.cwd(), "public", "index.html"));
}

export { serverFrontend };
