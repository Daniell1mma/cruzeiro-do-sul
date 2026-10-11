import express, { type Express } from "express";
import cors from "cors";
import session from "express-session";
import pinoHttp from "pino-http";
import path from "node:path";
import fs from "node:fs";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionSecret =
  process.env["SESSION_SECRET"] || "cruzeiro-do-sul-dev-secret-key-change-in-prod";

if (!process.env["SESSION_SECRET"] && process.env["NODE_ENV"] === "production") {
  logger.warn(
    "SESSION_SECRET is using default development secret. Please set SESSION_SECRET in production.",
  );
}

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production",
      sameSite: process.env["NODE_ENV"] === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    },
  }),
);

app.use("/api", router);

// Suporte para servir o frontend compilado em produção (Fullstack Server)
const possibleFrontendPaths = [
  path.resolve(process.cwd(), "artifacts/cruzeiro-do-sul/dist/public"),
  path.resolve(process.cwd(), "dist/public"),
  typeof __dirname !== "undefined"
    ? path.resolve(__dirname, "../../cruzeiro-do-sul/dist/public")
    : null,
].filter((p): p is string => Boolean(p && fs.existsSync(p)));

const staticPath = possibleFrontendPaths[0] ?? null;

if (staticPath) {
  logger.info({ staticPath }, "Serving static frontend build");
  app.use(express.static(staticPath));
  app.use((req, res, next) => {
    if ((req.method === "GET" || req.method === "HEAD") && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(staticPath, "index.html"));
    }
    next();
  });
}

export default app;
