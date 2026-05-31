"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = require("hono/cors");
const corsMiddleware = (origin) => {
    return (0, cors_1.cors)({
        origin,
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        credentials: true,
    });
};
exports.corsMiddleware = corsMiddleware;
