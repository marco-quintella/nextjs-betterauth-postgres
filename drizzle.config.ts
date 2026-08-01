import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Necessário pro drizzle-kit migrate no preDeploy do Railway:
  // sem isso, o CLI tenta confirmar interativamente.
  strict: true,
});
