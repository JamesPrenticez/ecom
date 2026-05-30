import "dotenv/config";

const env = {
  PORT: Number(process.env.PORT || 4000),
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_PATH: process.env.DATABASE_PATH || "./data/ecom.sqlite",
  JWT_SECRET: process.env.JWT_SECRET || "dev_only_change_me",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000"
};

if (env.NODE_ENV === "production" && env.JWT_SECRET === "dev_only_change_me") {
  throw new Error("JWT_SECRET must be set in production");
}

export default env;
