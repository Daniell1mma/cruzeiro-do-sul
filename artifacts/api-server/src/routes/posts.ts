import { Router, type IRouter } from "express";
import { eq, desc, and } from "drizzle-orm";
import { db, postsTable } from "@workspace/db";
import {
  ListPostsQueryParams,
  CreatePostBody,
  CreatePostResponse,
  GetPostParams,
  GetPostResponse,
  UpdatePostParams,
  UpdatePostBody,
  UpdatePostResponse,
  DeletePostParams,
  GetPostBySlugParams,
  GetPostBySlugResponse,
  GetRecentPostsQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/posts", async (req, res): Promise<void> => {
  const query = ListPostsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  const { status, category, featured, limit = 20, offset = 0 } = query.data;
  const conditions = [];
  if (status) conditions.push(eq(postsTable.status, status));
  if (category) conditions.push(eq(postsTable.category, category));
  if (featured !== undefined) conditions.push(eq(postsTable.featured, featured));

  const posts = await db
    .select()
    .from(postsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(postsTable.createdAt))
    .limit(limit)
    .offset(offset);

  res.json(posts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  })));
});

router.get("/posts/featured", async (_req, res): Promise<void> => {
  const posts = await db
    .select()
    .from(postsTable)
    .where(and(eq(postsTable.featured, true), eq(postsTable.status, "published")))
    .orderBy(desc(postsTable.createdAt))
    .limit(6);
  res.json(posts.map((p) => ({ ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() })));
});

router.get("/posts/recent", async (req, res): Promise<void> => {
  const query = GetRecentPostsQueryParams.safeParse(req.query);
  const limit = query.success ? (query.data.limit ?? 6) : 6;
  const posts = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.status, "published"))
    .orderBy(desc(postsTable.createdAt))
    .limit(limit);
  res.json(posts.map((p) => ({ ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() })));
});

router.post("/posts", async (req, res): Promise<void> => {
  const parsed = CreatePostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [post] = await db.insert(postsTable).values(parsed.data).returning();
  res.status(201).json(CreatePostResponse.parse({ ...post, createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() }));
});

router.get("/posts/slug/:slug", async (req, res): Promise<void> => {
  const params = GetPostBySlugParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [post] = await db.select().from(postsTable).where(eq(postsTable.slug, params.data.slug));
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(GetPostBySlugResponse.parse({ ...post, createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() }));
});

router.get("/posts/:id", async (req, res): Promise<void> => {
  const params = GetPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [post] = await db.select().from(postsTable).where(eq(postsTable.id, params.data.id));
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(GetPostResponse.parse({ ...post, createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() }));
});

router.patch("/posts/:id", async (req, res): Promise<void> => {
  const params = UpdatePostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdatePostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [post] = await db.update(postsTable).set(parsed.data).where(eq(postsTable.id, params.data.id)).returning();
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(UpdatePostResponse.parse({ ...post, createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() }));
});

router.delete("/posts/:id", async (req, res): Promise<void> => {
  const params = DeletePostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(postsTable).where(eq(postsTable.id, params.data.id));
  res.sendStatus(204);
});

export default router;
