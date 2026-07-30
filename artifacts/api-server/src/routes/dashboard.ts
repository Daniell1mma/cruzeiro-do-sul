import { Router, type IRouter } from "express";
import { eq, count } from "drizzle-orm";
import {
  db,
  postsTable,
  coursesTable,
  galleryImagesTable,
  galleryAlbumsTable,
  libraryItemsTable,
  commentsTable,
  testimonialsTable,
} from "@workspace/db";
import { GetDashboardStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/dashboard/stats", async (_req, res): Promise<void> => {
  const [
    [{ total: totalPosts }],
    [{ total: publishedPosts }],
    [{ total: totalCourses }],
    [{ total: totalImages }],
    [{ total: totalAlbums }],
    [{ total: totalLibraryItems }],
    [{ total: pendingComments }],
    [{ total: pendingTestimonials }],
  ] = await Promise.all([
    db.select({ total: count() }).from(postsTable),
    db.select({ total: count() }).from(postsTable).where(eq(postsTable.status, "published")),
    db.select({ total: count() }).from(coursesTable),
    db.select({ total: count() }).from(galleryImagesTable),
    db.select({ total: count() }).from(galleryAlbumsTable),
    db.select({ total: count() }).from(libraryItemsTable),
    db.select({ total: count() }).from(commentsTable).where(eq(commentsTable.approved, false)),
    db.select({ total: count() }).from(testimonialsTable).where(eq(testimonialsTable.approved, false)),
  ]);

  res.json(GetDashboardStatsResponse.parse({
    totalPosts: Number(totalPosts),
    publishedPosts: Number(publishedPosts),
    totalCourses: Number(totalCourses),
    totalImages: Number(totalImages),
    totalAlbums: Number(totalAlbums),
    totalLibraryItems: Number(totalLibraryItems),
    pendingComments: Number(pendingComments),
    pendingTestimonials: Number(pendingTestimonials),
  }));
});

export default router;
