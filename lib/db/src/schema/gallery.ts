import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const galleryAlbumsTable = pgTable("gallery_albums", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  coverUrl: text("cover_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const galleryImagesTable = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id").notNull().references(() => galleryAlbumsTable.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAlbumSchema = createInsertSchema(galleryAlbumsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAlbum = z.infer<typeof insertAlbumSchema>;
export type GalleryAlbum = typeof galleryAlbumsTable.$inferSelect;

export const insertGalleryImageSchema = createInsertSchema(galleryImagesTable).omit({ id: true, createdAt: true });
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = typeof galleryImagesTable.$inferSelect;
