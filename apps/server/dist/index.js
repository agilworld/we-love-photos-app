"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
require("dotenv/config");
const photo_controller_1 = require("./photos/photo.controller");
const app = new hono_1.Hono();
app.use("*", (0, cors_1.cors)({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    allowMethods: ["GET", "POST", "OPTIONS"],
}));
app.route("/v1/api", photo_controller_1.photoRoutes);
app.get("/", (c) => {
    return c.json({ message: "We Love Photos API Server", status: "running" });
});
const port = parseInt(process.env.PORT || "3010", 10);
console.log(`Server starting on port ${port}...`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port,
});
console.log(`Server should be running on port ${port}`);
