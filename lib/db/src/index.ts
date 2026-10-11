if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile();
  } catch {
    // Optional .env
  }
}

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn(
    "[WARN] DATABASE_URL não configurada no ambiente. Para conectar a um banco real, defina DATABASE_URL no arquivo .env",
  );
}

// Conectar ao pool se DATABASE_URL fornecida, ou criar pool placeholder seguro
export const pool = new Pool({
  connectionString: databaseUrl || "postgresql://postgres:postgres@localhost:5432/cruzeiro_do_sul",
});

export const db = drizzle(pool, { schema });

export * from "./schema";
