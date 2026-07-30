import { Router, type IRouter } from "express";
import { eq, asc, count } from "drizzle-orm";
import { db, galleryAlbumsTable, galleryImagesTable } from "@workspace/db";
import {
  CreateAlbumBody,
  CreateAlbumResponse,
  GetAlbumParams,
  GetAlbumResponse,
  UpdateAlbumParams,
  UpdateAlbumBody,
  UpdateAlbumResponse,
  DeleteAlbumParams,
  CreateGalleryImageBody,
  CreateGalleryImageResponse,
  UpdateGalleryImageParams,
  UpdateGalleryImageBody,
  UpdateGalleryImageResponse,
  DeleteGalleryImageParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function fmtAlbum(a: typeof galleryAlbumsTable.$inferSelect, imageCount = 0) {
  return { ...a, imageCount, createdAt: a.createdAt.toISOString(), updatedAt: a.updatedAt.toISOString() };
}
function fmtImage(i: typeof galleryImagesTable.$inferSelect) {
  return { ...i, createdAt: i.createdAt.toISOString() };
}

router.get("/gallery/albums", async (_req, res): Promise<void> => {
  const albums = await db.select().from(galleryAlbumsTable).orderBy(asc(galleryAlbumsTable.createdAt));
  const counts = await Promise.all(
    albums.map((a) =>
      db.select({ cnt: count() }).from(galleryImagesTable).where(eq(galleryImagesTable.albumId, a.id))
    )
  );
  res.json(albums.map((a, i) => fmtAlbum(a, Number(counts[i][0]?.cnt ?? 0))));
});

router.post("/gallery/albums", async (req, res): Promise<void> => {
  const parsed = CreateAlbumBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [album] = await db.insert(galleryAlbumsTable).values(parsed.data).returning();
  res.status(201).json(CreateAlbumResponse.parse(fmtAlbum(album)));
});

router.get("/gallery/albums/:id", async (req, res): Promise<void> => {
  const params = GetAlbumParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [album] = await db.select().from(galleryAlbumsTable).where(eq(galleryAlbumsTable.id, params.data.id));
  if (!album) {
    res.status(404).json({ error: "Album not found" });
    return;
  }
  const images = await db
    .select()
    .from(galleryImagesTable)
    .where(eq(galleryImagesTable.albumId, params.data.id))
    .orderBy(asc(galleryImagesTable.sortOrder));
  res.json(GetAlbumResponse.parse({
    ...album,
    images: images.map(fmtImage),
    createdAt: album.createdAt.toISOString(),
    updatedAt: album.updatedAt.toISOString(),
  }));
});

router.patch("/gallery/albums/:id", async (req, res): Promise<void> => {
  const params = UpdateAlbumParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateAlbumBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [album] = await db.update(galleryAlbumsTable).set(parsed.data).where(eq(galleryAlbumsTable.id, params.data.id)).returning();
  if (!album) {
    res.status(404).json({ error: "Album not found" });
    return;
  }
  res.json(UpdateAlbumResponse.parse(fmtAlbum(album)));
});

router.delete("/gallery/albums/:id", async (req, res): Promise<void> => {
  const params = DeleteAlbumParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(galleryAlbumsTable).where(eq(galleryAlbumsTable.id, params.data.id));
  res.sendStatus(204);
});

router.post("/gallery/images", async (req, res): Promise<void> => {
  const parsed = CreateGalleryImageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [image] = await db.insert(galleryImagesTable).values({ ...parsed.data, albumId: Number(parsed.data.albumId) }).returning();
  res.status(201).json(CreateGalleryImageResponse.parse(fmtImage(image)));
});

router.patch("/gallery/images/:id", async (req, res): Promise<void> => {
  const params = UpdateGalleryImageParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateGalleryImageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [image] = await db.update(galleryImagesTable).set(parsed.data).where(eq(galleryImagesTable.id, params.data.id)).returning();
  if (!image) {
    res.status(404).json({ error: "Image not found" });
    return;
  }
  res.json(UpdateGalleryImageResponse.parse(fmtImage(image)));
});

router.delete("/gallery/images/:id", async (req, res): Promise<void> => {
  const params = DeleteGalleryImageParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(galleryImagesTable).where(eq(galleryImagesTable.id, params.data.id));
  res.sendStatus(204);
});

export default router;
