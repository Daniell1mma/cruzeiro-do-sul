import { Router, type IRouter } from "express";
import { eq, desc, and } from "drizzle-orm";
import { db, coursesTable } from "@workspace/db";
import {
  ListCoursesQueryParams,
  CreateCourseBody,
  CreateCourseResponse,
  GetCourseParams,
  GetCourseResponse,
  UpdateCourseParams,
  UpdateCourseBody,
  UpdateCourseResponse,
  DeleteCourseParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function fmt(c: typeof coursesTable.$inferSelect) {
  return { ...c, createdAt: c.createdAt.toISOString(), updatedAt: c.updatedAt.toISOString() };
}

router.get("/courses", async (req, res): Promise<void> => {
  const query = ListCoursesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  const { status, featured } = query.data;
  const conditions = [];
  if (status) conditions.push(eq(coursesTable.status, status));
  if (featured !== undefined) conditions.push(eq(coursesTable.featured, featured));
  const courses = await db
    .select()
    .from(coursesTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(coursesTable.createdAt));
  res.json(courses.map(fmt));
});

router.get("/courses/featured", async (_req, res): Promise<void> => {
  const courses = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.featured, true))
    .orderBy(desc(coursesTable.createdAt))
    .limit(6);
  res.json(courses.map(fmt));
});

router.post("/courses", async (req, res): Promise<void> => {
  const parsed = CreateCourseBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [course] = await db.insert(coursesTable).values(parsed.data).returning();
  res.status(201).json(CreateCourseResponse.parse(fmt(course)));
});

router.get("/courses/:id", async (req, res): Promise<void> => {
  const params = GetCourseParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, params.data.id));
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  res.json(GetCourseResponse.parse(fmt(course)));
});

router.patch("/courses/:id", async (req, res): Promise<void> => {
  const params = UpdateCourseParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateCourseBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [course] = await db.update(coursesTable).set(parsed.data).where(eq(coursesTable.id, params.data.id)).returning();
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  res.json(UpdateCourseResponse.parse(fmt(course)));
});

router.delete("/courses/:id", async (req, res): Promise<void> => {
  const params = DeleteCourseParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(coursesTable).where(eq(coursesTable.id, params.data.id));
  res.sendStatus(204);
});

export default router;
