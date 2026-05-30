import bcrypt from "bcryptjs";
import db from "../config/db";
import "./migrate";

const passwordHash = bcrypt.hashSync("password123", 10);

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (email, password_hash, role)
  VALUES (?, ?, ?)
`);

insertUser.run("admin@example.com", passwordHash, "admin");
insertUser.run("customer@example.com", passwordHash, "customer");

const insertProduct = db.prepare(`
  INSERT OR IGNORE INTO products
  (name, slug, description, category, badge, bg, emoji, price_cents, stock, is_active)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const products = [
  ["Starter Bundle",             "starter-bundle",       "The perfect intro — our best-selling soap, shampoo, and shave gel in one box.", "Bundles",          "Best Value",   "linear-gradient(135deg, #1a0d30 0%, #3d1a6e 100%)", "🎁", 5499, 42,  1],
  ["The Wild Set",               "the-wild-set",         "Every category covered. One box, complete routine.",                            "Bundles",          "Save 20%",     "linear-gradient(135deg, #0d1a30 0%, #1a3d6e 100%)", "📦", 8999, 18,  1],
  ["Cedar & Pine Bar Soap",      "cedar-pine-bar-soap",  "Cold-pressed with real cedarwood and pine essential oils. Long-lasting, rich lather.", "Soap & Body Wash", "Best Seller",  "linear-gradient(135deg, #0a2e1a 0%, #145c30 100%)", "🌲", 1299, 120, 1],
  ["Activated Charcoal Body Wash","charcoal-body-wash",  "Deep-cleansing activated charcoal formula that draws out impurities without stripping skin.", "Soap & Body Wash", null,           "linear-gradient(135deg, #111111 0%, #2d2d2d 100%)", "🖤", 1899, 64,  1],
  ["Citrus Burst Liquid Soap",   "citrus-burst-soap",    "Uplifting blend of orange, grapefruit, and lemon. Light, foamy, and energising.", "Soap & Body Wash", "New",          "linear-gradient(135deg, #2e1a00 0%, #5c3a00 100%)", "🍊", 1599, 55,  1],
  ["Eucalyptus Body Wash",       "eucalyptus-body-wash", "Cooling eucalyptus and mint — the wake-up call your shower routine needs.",     "Soap & Body Wash", null,           "linear-gradient(135deg, #003030 0%, #006060 100%)", "🌿", 1699, 38,  1],
  ["Wild Shampoo",               "wild-shampoo",         "Sulphate-free formula with argan oil and biotin. For all hair types.",          "Hair",             "Best Seller",  "linear-gradient(135deg, #1e0a40 0%, #4a1e8c 100%)", "✨", 2299, 88,  1],
  ["Deep Conditioner",           "deep-conditioner",     "Intense moisture treatment with shea butter and keratin. Leave in for 5 minutes.", "Hair",           null,           "linear-gradient(135deg, #2a0e4a 0%, #5c1a99 100%)", "💜", 2499, 72,  1],
  ["Wild Hair Oil",              "wild-hair-oil",        "Lightweight blend of jojoba, rosehip, and vitamin E. Frizz control without the grease.", "Hair",      "New",          "linear-gradient(135deg, #1a0a2e 0%, #3d1a6e 100%)", "💧", 2899, 45,  1],
  ["Daily Face Wash",            "daily-face-wash",      "Gentle pH-balanced cleanser for all skin types. No parabens, no sulphates.",    "Skin",             null,           "linear-gradient(135deg, #2e0e1a 0%, #5c1a38 100%)", "🌸", 1999, 95,  1],
  ["Hydrating Moisturiser",      "hydrating-moisturiser","Hyaluronic acid and ceramide complex. 24-hour hydration, non-comedogenic.",     "Skin",             "Best Seller",  "linear-gradient(135deg, #2e1a0a 0%, #5c3820 100%)", "🫧", 2899, 60,  1],
  ["Vitamin C Serum",            "vitamin-c-serum",      "15% stable vitamin C with ferulic acid. Brightens, firms, and protects.",       "Skin",             "New",          "linear-gradient(135deg, #2e1a00 0%, #5c3a00 100%)", "⭐", 3499, 33,  1],
  ["Wild Shave Gel",             "wild-shave-gel",       "Cushioning shave gel with aloe vera. Transparent for precision, soothing on contact.", "Shave",     null,           "linear-gradient(135deg, #0a1a2e 0%, #1a3a5c 100%)", "🪒", 1499, 80,  1],
  ["Post-Shave Balm",            "post-shave-balm",      "Alcohol-free soothing balm with bisabolol and witch hazel. Zero sting.",        "Shave",            null,           "linear-gradient(135deg, #0d2030 0%, #1a3d52 100%)", "❄️", 1899, 51,  1],
] as const;

for (const p of products) {
  insertProduct.run(...p);
}

console.log("Database seeded");
