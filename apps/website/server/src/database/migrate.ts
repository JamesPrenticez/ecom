import fs from "node:fs";
import path from "node:path";
import db from "../config/db";

const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
db.exec(schema);

console.log("Database migrated");
