import { Router, type IRouter } from "express";
import { eq, desc, and } from "drizzle-orm";
import { db, testimonialsTable } from "@workspace/db";
import {
  ListTestimonialsQueryParams,
  CreateTestimonialBody,
  CreateTestimonialResponse,
  UpdateTestimonialParams,
  UpdateTestimonialBody,
  UpdateTestimonialResponse,
  DeleteTestimonialParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function fmt(t: typeof testimonialsTable.$inferSelect) {
  return { ...t, createdAt: t.createdAt.toISOString() };
}

router.get("/testimonials", async (req, res): Promise<void> => {
  const query = ListTestimonialsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  const { approved } = query.data;
  const conditions = [];
  if (approved !== undefined) conditions.push(eq(testimonialsTable.approved, approved));
  const items = await db
    .select()
    .from(testimonialsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(testimonialsTable.createdAt));
  res.json(items.map(fmt));
});

router.post("/testimonials", async (req, res): Promise<void> => {
  const parsed = CreateTestimonialBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.insert(testimonialsTable).values({ ...parsed.data, approved: false }).returning();
  res.status(201).json(CreateTestimonialResponse.parse(fmt(item)));
});

router.patch("/testimonials/:id", async (req, res): Promise<void> => {
  const params = UpdateTestimonialParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateTestimonialBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.update(testimonialsTable).set(parsed.data).where(eq(testimonialsTable.id, params.data.id)).returning();
  if (!item) {
    res.status(404).json({ error: "Testimonial not found" });
    return;
  }
  res.json(UpdateTestimonialResponse.parse(fmt(item)));
});

router.delete("/testimonials/:id", async (req, res): Promise<void> => {
  const params = DeleteTestimonialParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(testimonialsTable).where(eq(testimonialsTable.id, params.data.id));
  res.sendStatus(204);
});

export default router;
