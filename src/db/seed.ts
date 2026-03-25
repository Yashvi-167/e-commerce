import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { products } from './schema';

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Cannot seed Neon database.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

const baseShipping = "Dispatches within 24 hours. Premium rigid packaging to ensure perfect transit condition.";

const seedProducts = [
  { 
    name: "Premium Alpha Rain Jacket", 
    price: "299.99", compareAtPrice: "350.00",
    description: "Conquer any climate with the Alpha Rain Jacket. Featuring proprietary water-resistant architecture, this jacket is engineered to keep you bone dry while preventing overheating.", 
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80", 
    department: "Men", category: "Shirts",
    sku: "AUR-M-JCK-01", inventory: 45, vendor: "AURALIS EXPERIMENTAL", tags: "jacket, waterproof, premium, winter",
    metaTitle: "Premium Alpha Rain Jacket | Waterproof Men's Outerwear",
    metaDescription: "Shop the AURALIS Alpha Rain Jacket. Engineered with proprietary water-resistant micro-mesh to keep you dry and comfortable.",
    features: ["100k Waterproof rating", "Breathable micro-mesh lining", "Hidden tactical pockets", "Matte black hardware"],
    variants: ["S", "M", "L", "XL", "XXL"],
    reviewsRating: "4.95", reviewsCount: 342, shippingInfo: baseShipping
  },
  { 
    name: "Essential Modal T-Shirt", 
    price: "45.00", compareAtPrice: "55.00",
    description: "The perfect everyday comfortable fit. Knitted using ultra-soft organic cotton and linen blends, solving the problem of stiff, itchy everyday wear.", 
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80", 
    department: "Men", category: "T-Shirts",
    sku: "AUR-M-TEE-02", inventory: 210, vendor: "AURALIS BASICS", tags: "tshirt, basic, cotton, everyday",
    metaTitle: "Essential Modal T-Shirt | Premium Men's Basics",
    metaDescription: "Upgrade your basics with our ultra-soft organic cotton and linen T-shirt. Engineered to prevent shrinking and pilling.",
    features: ["Zero-shrink fabric wash", "Tagless collar to prevent irritation", "Reinforced double-stitched hem"],
    variants: ["XS", "S", "M", "L", "XL"],
    reviewsRating: "4.8", reviewsCount: 1564, shippingInfo: baseShipping
  },
  { 
    name: "Utility Cargo Pants", 
    price: "189.50", compareAtPrice: "210.00",
    description: "Utility-first cargo pants with multiple accessible pockets. Built to endure heavy physical wear while retaining a tailored, highly sophisticated silhouette.", 
    imageUrl: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80", 
    department: "Men", category: "Pants",
    sku: "AUR-M-PNT-03", inventory: 60, vendor: "AURALIS EXPERIMENTAL", tags: "pants, cargo, utility, durable",
    metaTitle: "Utility Cargo Pants | Durable Men's High-Fashion Cargos",
    metaDescription: "Shop the ultimate heavy-duty Utility Cargo Pants by AURALIS. Tailored silhouette matching intense durability.",
    features: ["12oz Heavyweight cotton canvas", "Adjustable magnetic ankle stops", "6 deep-storage utility pockets"],
    variants: ["28x30", "30x30", "32x32", "34x32", "36x34"],
    reviewsRating: "4.9", reviewsCount: 228, shippingInfo: baseShipping
  },
  { 
    name: "AURALIS Performance Sneaker", 
    price: "245.00", compareAtPrice: "300.00",
    description: "Maximum performance sneaker for constant motion. Solves foot fatigue with our revolutionary foam midsole designed to return energy upon impact.", 
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80", 
    department: "Men", category: "Footwear",
    sku: "AUR-M-SH-04", inventory: 8, vendor: "AURALIS FOOTWEAR", tags: "shoes, sneaker, performance, athletic",
    metaTitle: "AURALIS Performance Sneaker | Advanced Energy Return Shoes",
    metaDescription: "Experience zero foot fatigue with the AURALIS Performance Sneaker. Designed for relentless urban traversal.",
    features: ["Energy-return foam midsole", "Carbon-fiber flex plate", "Breathable knit upper"],
    variants: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    reviewsRating: "4.99", reviewsCount: 512, shippingInfo: baseShipping
  },
  { 
    name: "Silk Slip Night Dress", 
    price: "175.00", compareAtPrice: null,
    description: "An elegant, timeless silk dress that flows effortlessly. Naturally thermoregulating silk keeps you cool during warm evenings while maintaining an opulent luster.", 
    imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80", 
    department: "Women", category: "Dresses",
    sku: "AUR-W-DR-05", inventory: 120, vendor: "AURALIS LUXE", tags: "dress, silk, evening, formal",
    metaTitle: "Silk Slip Night Dress | Luxury Women's Eveningwear",
    metaDescription: "Exude pure elegance with the AURALIS Silk Slip Night Dress. 100% natural thermoregulating silk for summer evenings.",
    features: ["100% Mulberry Silk", "Adjustable delicate straps", "Naturally hypoallergenic"],
    variants: ["XS", "S", "M", "L"],
    reviewsRating: "4.85", reviewsCount: 405, shippingInfo: baseShipping
  },
  { 
    name: "Classic Straight Denim Jeans", 
    price: "95.00", compareAtPrice: null,
    description: "Timeless straight cut denim for every occasion. A rigid, vintage feel that molds perfectly to your body over time, eradicating the 'too stretchy' feel of modern denim.", 
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80", 
    department: "Women", category: "Jeans",
    sku: "AUR-W-JN-06", inventory: 300, vendor: "AURALIS DENIM", tags: "jeans, denim, straight, vintage",
    metaTitle: "Classic Straight Denim Jeans | Rigid Women's Vintage Denim",
    metaDescription: "Genuine rigid 14oz denim straight jeans by AURALIS. Vintage cut designed to permanently mold to your proportions.",
    features: ["14oz Rigid non-stretch denim", "High-rise waist", "Raw copper rivets"],
    variants: ["24", "25", "26", "27", "28", "29", "30", "31"],
    reviewsRating: "4.7", reviewsCount: 88, shippingInfo: baseShipping
  },
  { 
    name: "Cognac Leather Tote Bag", 
    price: "280.00", compareAtPrice: "340.00",
    description: "Carry all your essentials securely in pure, hand-crafted leather. Includes a padded laptop sleeve and multiple organizational compartments to eliminate bag clutter.", 
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80", 
    department: "Women", category: "Accessories",
    sku: "AUR-W-ACC-07", inventory: 22, vendor: "AURALIS CRAFT", tags: "bag, leather, tote, accessories",
    metaTitle: "Cognac Leather Tote Bag | Hand-Crafted Luxury Carrier",
    metaDescription: "The ultimate AURALIS Cognac Leather Tote Bag. Features organized compartments and an internal laptop sleeve for seamless commutes.",
    features: ["Full-grain Italian leather", "Brass protective feet", "Dedicated 15-inch laptop sleeve", "Waterproof internal lining"],
    variants: ["Cognac", "Obsidian Black"],
    reviewsRating: "5.00", reviewsCount: 30, shippingInfo: baseShipping
  }
];

async function main() {
  console.log("Emptying old database records to reset IDs...");
  await db.delete(products);

  console.log("Seeding extreme rich products data...");
  for (const product of seedProducts) {
    await db.insert(products).values(product);
  }
  console.log("Seeding finished completely.");
  process.exit(0);
}
main().catch(e => {
  console.error("Fatal Seeding Error: ", e);
  process.exit(1);
});
