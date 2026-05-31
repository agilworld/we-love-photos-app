"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoRoutes = void 0;
const hono_1 = require("hono");
const photo_service_1 = require("./photo.service");
const photo_schema_1 = require("./photo.schema");
exports.photoRoutes = new hono_1.Hono();
exports.photoRoutes.get('/search', async (c) => {
    const keyword = c.req.query('keyword');
    if (!keyword) {
        return c.json({ success: false, error: 'keyword query parameter is required' }, 400);
    }
    const parsed = photo_schema_1.searchQuerySchema.safeParse({ keyword });
    if (!parsed.success) {
        return c.json({ success: false, error: parsed.error.flatten() }, 400);
    }
    try {
        const service = new photo_service_1.PhotoService();
        const result = await service.searchByKeyword(parsed.data.keyword);
        return c.json({ success: true, data: result });
    }
    catch (error) {
        console.error('Error searching photos:', error);
        return c.json({ success: false, error: 'Internal server error' }, 500);
    }
});
