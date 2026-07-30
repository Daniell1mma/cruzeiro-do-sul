import "express-session";

declare module "express-session" {
  interface SessionData {
    adminUserId: number;
    adminUserName: string;
    adminUserEmail: string;
  }
}

import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, adminUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

// POST /api/auth/login
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ error: "Email e senha são obrigatórios" });
    return;
  }

  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.email, email.toLowerCase().trim()))
    .limit(1);

  if (!user) {
    res.status(401).json({ error: "Credenciais inválidas" });
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    res.status(401).json({ error: "Credenciais inválidas" });
    return;
  }

  req.session.adminUserId = user.id;
  req.session.adminUserName = user.name;
  req.session.adminUserEmail = user.email;

  res.json({ id: user.id, name: user.name, email: user.email });
});

// POST /api/auth/logout
router.post("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

// GET /api/auth/me
router.get("/auth/me", (req, res) => {
  if (!req.session.adminUserId) {
    res.status(401).json({ error: "Não autenticado" });
    return;
  }

  res.json({
    id: req.session.adminUserId,
    name: req.session.adminUserName,
    email: req.session.adminUserEmail,
  });
});

export default router;
