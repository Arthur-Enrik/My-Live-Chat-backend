import express from "express";
import { notFound } from "../Middleware/page-not-found.middleware.js";

const router = express.Router();

import { UserRoute } from "./User/user.route.js";
import { ChatRoute } from "./Chat/chat.routes.js";

router.use("/users", UserRoute);
router.use("/chats", ChatRoute);
router.use(notFound);

// router.get('/api/help', helpController)

export { router };
