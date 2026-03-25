import { pgTable, text, serial, timestamp, decimal, integer, json } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url"),
  department: text("department").notNull().default("Apparel"),
  category: text("category").notNull().default("Uncategorized"),
  sku: text("sku"),
  inventory: integer("inventory").default(100),
  vendor: text("vendor").default("AURALIS"),
  tags: text("tags"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  shippingInfo: text("shipping_info").default("Free express shipping inside the US. Guaranteed delivery in 3 days."),
  features: json("features").default([]),
  variants: json("variants").default([]),
  reviewsRating: decimal("reviews_rating", { precision: 3, scale: 2 }).default("4.9"),
  reviewsCount: integer("reviews_count").default(128),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
