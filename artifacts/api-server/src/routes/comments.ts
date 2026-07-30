import { Router, type IRouter } from "express";
import { eq, desc, and } from "drizzle-orm";
import { db, commentsTable } from "@workspace/db";
import {
  ListCommentsQueryParams,
  CreateCommentBody,
  CreateCommentResponse,
  UpdateCommentParams,
  UpdateCommentBody,
  UpdateCommentResponse,
  DeleteCommentParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function fmt(c: typeof commentsTable.$inferSelect) {
  return { ...c, createdAt: c.createdAt.toISOString() };
}

router.get("/comments", async (req, res): Promise<void> => {
  const query = ListCommentsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  const { postId, postType, approved } = query.data;
  const conditions = [];
  if (postId !== undefined) conditions.push(eq(commentsTable.postId, postId));
  if (postType) conditions.push(eq(commentsTable.postType, postType));
  if (approved !== undefined) conditions.push(eq(commentsTable.approved, approved));
  const items = await db
    .select()
    .from(commentsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(commentsTable.createdAt));
  res.json(items.map(fmt));
});

router.post("/comments", async (req, res): Promise<void> => {
  const parsed = CreateCommentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.insert(commentsTable).values({ ...parsed.data, approved: false }).returning();
  res.status(201).json(CreateCommentResponse.parse(fmt(item)));
});

router.patch("/comments/:id", async (req, res): Promise<void> => {
  const params = UpdateCommentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateCommentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.update(commentsTable).set(parsed.data).where(eq(commentsTable.id, params.data.id)).returning();
  if (!item) {
    res.status(404).json({ error: "Comment not found" });
    return;
  }
  res.json(UpdateCommentResponse.parse(fmt(item)));
});

router.delete("/comments/:id", async (req, res): Promise<void> => {
  const params = DeleteCommentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(commentsTable).where(eq(commentsTable.id, params.data.id));
  res.sendStatus(204);
});

export default router;
