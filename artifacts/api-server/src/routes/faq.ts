import { Router, type IRouter } from "express";
import { eq, asc, and } from "drizzle-orm";
import { db, faqItemsTable } from "@workspace/db";
import {
  ListFaqItemsQueryParams,
  CreateFaqItemBody,
  CreateFaqItemResponse,
  UpdateFaqItemParams,
  UpdateFaqItemBody,
  UpdateFaqItemResponse,
  DeleteFaqItemParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function fmt(f: typeof faqItemsTable.$inferSelect) {
  return { ...f, createdAt: f.createdAt.toISOString() };
}

router.get("/faq", async (req, res): Promise<void> => {
  const query = ListFaqItemsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  const { category } = query.data;
  const conditions = [];
  if (category) conditions.push(eq(faqItemsTable.category, category));
  const items = await db
    .select()
    .from(faqItemsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(asc(faqItemsTable.sortOrder));
  res.json(items.map(fmt));
});

router.post("/faq", async (req, res): Promise<void> => {
  const parsed = CreateFaqItemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.insert(faqItemsTable).values(parsed.data).returning();
  res.status(201).json(CreateFaqItemResponse.parse(fmt(item)));
});

router.patch("/faq/:id", async (req, res): Promise<void> => {
  const params = UpdateFaqItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateFaqItemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.update(faqItemsTable).set(parsed.data).where(eq(faqItemsTable.id, params.data.id)).returning();
  if (!item) {
    res.status(404).json({ error: "FAQ item not found" });
    return;
  }
  res.json(UpdateFaqItemResponse.parse(fmt(item)));
});

router.delete("/faq/:id", async (req, res): Promise<void> => {
  const params = DeleteFaqItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(faqItemsTable).where(eq(faqItemsTable.id, params.data.id));
  res.sendStatus(204);
});

export default router;
