import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const libraryItemsTable = pgTable("library_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull().default("article"),
  description: text("description"),
  fileUrl: text("file_url"),
  category: text("category"),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertLibraryItemSchema = createInsertSchema(libraryItemsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertLibraryItem = z.infer<typeof insertLibraryItemSchema>;
export type LibraryItem = typeof libraryItemsTable.$inferSelect;
