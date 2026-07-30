import { Router, type IRouter } from "express";
import { eq, desc, and } from "drizzle-orm";
import { db, libraryItemsTable } from "@workspace/db";
import {
  ListLibraryItemsQueryParams,
  CreateLibraryItemBody,
  CreateLibraryItemResponse,
  GetLibraryItemParams,
  GetLibraryItemResponse,
  UpdateLibraryItemParams,
  UpdateLibraryItemBody,
  UpdateLibraryItemResponse,
  DeleteLibraryItemParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function fmt(item: typeof libraryItemsTable.$inferSelect) {
  return { ...item, createdAt: item.createdAt.toISOString(), updatedAt: item.updatedAt.toISOString() };
}

router.get("/library", async (req, res): Promise<void> => {
  const query = ListLibraryItemsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  const { type, category } = query.data;
  const conditions = [];
  if (type) conditions.push(eq(libraryItemsTable.type, type));
  if (category) conditions.push(eq(libraryItemsTable.category, category));
  const items = await db
    .select()
    .from(libraryItemsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(libraryItemsTable.createdAt));
  res.json(items.map(fmt));
});

router.post("/library", async (req, res): Promise<void> => {
  const parsed = CreateLibraryItemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.insert(libraryItemsTable).values(parsed.data).returning();
  res.status(201).json(CreateLibraryItemResponse.parse(fmt(item)));
});

router.get("/library/:id", async (req, res): Promise<void> => {
  const params = GetLibraryItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db.select().from(libraryItemsTable).where(eq(libraryItemsTable.id, params.data.id));
  if (!item) {
    res.status(404).json({ error: "Library item not found" });
    return;
  }
  res.json(GetLibraryItemResponse.parse(fmt(item)));
});

router.patch("/library/:id", async (req, res): Promise<void> => {
  const params = UpdateLibraryItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateLibraryItemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.update(libraryItemsTable).set(parsed.data).where(eq(libraryItemsTable.id, params.data.id)).returning();
  if (!item) {
    res.status(404).json({ error: "Library item not found" });
    return;
  }
  res.json(UpdateLibraryItemResponse.parse(fmt(item)));
});

router.delete("/library/:id", async (req, res): Promise<void> => {
  const params = DeleteLibraryItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(libraryItemsTable).where(eq(libraryItemsTable.id, params.data.id));
  res.sendStatus(204);
});

export default router;
