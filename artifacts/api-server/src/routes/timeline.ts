import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, timelineEventsTable } from "@workspace/db";
import {
  CreateTimelineEventBody,
  CreateTimelineEventResponse,
  UpdateTimelineEventParams,
  UpdateTimelineEventBody,
  UpdateTimelineEventResponse,
  DeleteTimelineEventParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function fmt(e: typeof timelineEventsTable.$inferSelect) {
  return { ...e, createdAt: e.createdAt.toISOString() };
}

router.get("/timeline", async (_req, res): Promise<void> => {
  const events = await db.select().from(timelineEventsTable).orderBy(asc(timelineEventsTable.sortOrder));
  res.json(events.map(fmt));
});

router.post("/timeline", async (req, res): Promise<void> => {
  const parsed = CreateTimelineEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [event] = await db.insert(timelineEventsTable).values(parsed.data).returning();
  res.status(201).json(CreateTimelineEventResponse.parse(fmt(event)));
});

router.patch("/timeline/:id", async (req, res): Promise<void> => {
  const params = UpdateTimelineEventParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateTimelineEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [event] = await db.update(timelineEventsTable).set(parsed.data).where(eq(timelineEventsTable.id, params.data.id)).returning();
  if (!event) {
    res.status(404).json({ error: "Event not found" });
    return;
  }
  res.json(UpdateTimelineEventResponse.parse(fmt(event)));
});

router.delete("/timeline/:id", async (req, res): Promise<void> => {
  const params = DeleteTimelineEventParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(timelineEventsTable).where(eq(timelineEventsTable.id, params.data.id));
  res.sendStatus(204);
});

export default router;
