"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQuerySchema = void 0;
const zod_1 = require("zod");
exports.searchQuerySchema = zod_1.z.object({
    keyword: zod_1.z.string().min(1).max(200),
});
