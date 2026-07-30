import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, siteSettingsTable } from "@workspace/db";
import {
  GetSettingParams,
  GetSettingResponse,
  UpsertSettingParams,
  UpsertSettingBody,
  UpsertSettingResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function fmt(s: typeof siteSettingsTable.$inferSelect) {
  return { ...s, updatedAt: s.updatedAt.toISOString() };
}

router.get("/settings", async (_req, res): Promise<void> => {
  const settings = await db.select().from(siteSettingsTable);
  res.json(settings.map(fmt));
});

router.get("/settings/:key", async (req, res): Promise<void> => {
  const params = GetSettingParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [setting] = await db.select().from(siteSettingsTable).where(eq(siteSettingsTable.key, params.data.key));
  if (!setting) {
    res.status(404).json({ error: "Setting not found" });
    return;
  }
  res.json(GetSettingResponse.parse(fmt(setting)));
});

router.put("/settings/:key", async (req, res): Promise<void> => {
  const params = UpsertSettingParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpsertSettingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [setting] = await db
    .insert(siteSettingsTable)
    .values({ key: params.data.key, value: parsed.data.value })
    .onConflictDoUpdate({ target: siteSettingsTable.key, set: { value: parsed.data.value } })
    .returning();
  res.json(UpsertSettingResponse.parse(fmt(setting)));
});

export default router;
