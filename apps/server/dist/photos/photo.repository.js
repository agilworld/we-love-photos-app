"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoRepository = void 0;
const db_1 = require("@welovephotos/db");
const db_2 = require("@welovephotos/db");
const drizzle_orm_1 = require("drizzle-orm");
class PhotoRepository {
    async findPhotoIdsByKeyword(keyword) {
        const rows = await db_1.db
            .select({ photoId: db_2.unsplashKeywords.photoId })
            .from(db_2.unsplashKeywords)
            .where((0, drizzle_orm_1.like)(db_2.unsplashKeywords.keyword, `%${keyword}%`));
        return [...new Set(rows.map(r => r.photoId))];
    }
    async findPhotosByIds(photoIds) {
        if (photoIds.length === 0)
            return [];
        return db_1.db
            .select()
            .from(db_2.unsplashPhotos)
            .where((0, drizzle_orm_1.inArray)(db_2.unsplashPhotos.photoId, photoIds));
    }
}
exports.PhotoRepository = PhotoRepository;
