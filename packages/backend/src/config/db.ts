import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import EnvSecret from "../constants/envVariables";

// Initialize the connection pool with Neon DB connection string
const pool = new Pool({
  connectionString: EnvSecret.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Drizzle ORM setup with the pool
const db = drizzle(pool, {
  logger: true,
});

export { db };
