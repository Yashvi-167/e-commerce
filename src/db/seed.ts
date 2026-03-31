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
  // --- MEN ---
  { 
    name: "Classic Indigo Selvedge Jeans", 
    price: "12035.00", compareAtPrice: "14940.00",
    description: "Premium raw indigo selvedge denim. These jeans are designed to age beautifully, creating unique fades tailored to your life.", 
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80", 
    department: "Men", category: "Jeans",
    sku: "BME-M-JN-01", inventory: 50, vendor: "BELLE AME DENIM", tags: "jeans, denim, men, classic",
    features: ["14.5oz Raw Selvedge Denim", "Button Fly", "Reinforced Pockets"],
    variants: ["30x30", "32x32", "34x32", "36x34"]
  },
  { 
    name: "Oversized Heavyweight T-Shirt", 
    price: "4565.00",
    description: "A thick, structured t-shirt that maintains its shape. Made from 300GSM organic cotton for a premium, heavy feel.", 
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80", 
    department: "Men", category: "T-Shirts",
    sku: "BME-M-TS-01", inventory: 150, vendor: "BELLE AME BASICS", tags: "tshirt, cotton, oversized, men",
    features: ["300GSM Organic Cotton", "Dropped Shoulders", "Double-Stitched Hem"],
    variants: ["S", "M", "L", "XL"]
  },
  { 
    name: "Executive Oxford Shirt", 
    price: "7055.00", compareAtPrice: "9130.00",
    description: "The essential office shirt. Crisp, breathable, and wrinkle-resistant for the modern professional.", 
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80", 
    department: "Men", category: "Shirts",
    sku: "BME-M-SH-01", inventory: 80, vendor: "BELLE AME TAIOR", tags: "shirt, oxford, office, men",
    features: ["Pima Cotton", "Tailored Fit", "Adjustable Cuffs"],
    variants: ["15", "15.5", "16", "16.5", "17"]
  },
  { 
    name: "Nomad Tech Bomber Jacket", 
    price: "18260.00",
    description: "Weather-resistant shell with a minimalist silhouette. Perfect for urban exploration and changing climates.", 
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80", 
    department: "Men", category: "Jackets",
    sku: "BME-M-JK-01", inventory: 35, vendor: "BELLE AME TECH", tags: "jacket, bomber, techwear, men",
    features: ["Water-repellent Finish", "Internal Chest Pocket", "Ribbed Trims"],
    variants: ["M", "L", "XL"]
  },
  { 
    name: "Urban Explorer Sneakers", 
    price: "13695.00", compareAtPrice: "16185.00",
    description: "Lightweight sneakers designed for all-day comfort. Features a responsive sole and breathable knit upper.", 
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80", 
    department: "Men", category: "Footwear",
    sku: "BME-M-FW-01", inventory: 40, vendor: "BELLE AME STEPS", tags: "sneakers, footwear, men, athletic",
    features: ["Memory Foam Insole", "Vibram Outsole", "Recycled Mesh"],
    variants: ["8", "9", "10", "11", "12"]
  },

  // --- WOMEN ---
  { 
    name: "High-Rise Distressed Jeans", 
    price: "9960.00",
    description: "Elevated denim with subtle distressing for a lived-in look. Flattering high-rise cut with a touch of stretch.", 
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80", 
    department: "Women", category: "Jeans",
    sku: "BME-W-JN-01", inventory: 60, vendor: "BELLE AME DENIM", tags: "jeans, denim, women, high-rise",
    features: ["Stretch Denim", "Reinforced Seams", "Classic 5-pocket design"],
    variants: ["24", "26", "28", "30", "32"]
  },
  { 
    name: "Luxe Cashmere T-Shirt", 
    price: "7885.00", compareAtPrice: "10375.00",
    description: "Unbelievably soft cashmere blend. A t-shirt that brings luxury to your everyday rotation.", 
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80", 
    department: "Women", category: "T-Shirts",
    sku: "BME-W-TS-01", inventory: 45, vendor: "BELLE AME LUXE", tags: "tshirt, cashmere, luxury, women",
    features: ["70% Cashmere", "Seamless Construction", "Relaxed Fit"],
    variants: ["XS", "S", "M", "L"]
  },
  { 
    name: "Silk Flow Blouse", 
    price: "9130.00",
    description: "Elegant silk blouse with a draped silhouette. Transitions perfectly from office to evening.", 
    imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80", 
    department: "Women", category: "Shirts",
    sku: "BME-W-SH-01", inventory: 30, vendor: "BELLE AME LUXE", tags: "shirt, blouse, silk, women",
    features: ["100% Silk", "Pearl Buttons", "Side Slits"],
    variants: ["S", "M", "L"]
  },
  { 
    name: "Minimalist Trench Coat", 
    price: "23240.00", compareAtPrice: "29050.00",
    description: "A modern take on the classic trench. Water-resistant and incredibly sharp.", 
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80", 
    department: "Women", category: "Jackets",
    sku: "BME-W-JK-01", inventory: 20, vendor: "BELLE AME OUTER", tags: "jacket, trench, coat, women",
    features: ["Recycled Polyester", "Belted Waist", "Deep Pockets"],
    variants: ["S", "M", "L"]
  },
  { 
    name: "Midnight Velvet Heels", 
    price: "15355.00",
    description: "Stunning velvet heels for special occasions. Features a comfortable block heel for all-night wear.", 
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80", 
    department: "Women", category: "Footwear",
    sku: "BME-W-FW-01", inventory: 25, vendor: "BELLE AME STEPS", tags: "heels, footwear, women, dressy",
    features: ["Premium Velvet", "Cushioned Sole", "Gold Hardware"],
    variants: ["6", "7", "8", "9"]
  },
  { 
    name: "Satin Slip Midi Dress", 
    price: "11205.00",
    description: "The ultimate 90s inspired slip dress. Shimmering satin that hugs the body beautifully.", 
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80", 
    department: "Women", category: "Dresses",
    sku: "BME-W-DR-01", inventory: 40, vendor: "BELLE AME LUXE", tags: "dress, satin, women, midi",
    features: ["Satin Finish", "Side Slit", "Adjustable Straps"],
    variants: ["XS", "S", "M", "L"]
  },

  // --- KIDS ---
  { 
    name: "Comfy Stretch Kids Jeans", 
    price: "3735.00",
    description: "Durable and stretchy jeans designed for active kids. Features an adjustable waistband.", 
    imageUrl: "https://images.unsplash.com/photo-1519457431-7571f0181e4b?auto=format&fit=crop&q=80", 
    department: "Kids", category: "Jeans",
    sku: "BME-K-JN-01", inventory: 90, vendor: "BELLE AME MINI", tags: "jeans, kids, denim, adjustable",
    features: ["4-Way Stretch", "Adjustable Waist", "Soft Lining"],
    variants: ["2T", "3T", "4T", "5", "6"]
  },
  { 
    name: "Graphic Adventure T-Shirt", 
    price: "2075.00",
    description: "Fun, high-quality graphic tee made from soft organic cotton.", 
    imageUrl: "https://images.unsplash.com/photo-1519235108751-14e2732a2e3b?auto=format&fit=crop&q=80", 
    department: "Kids", category: "T-Shirts",
    sku: "BME-K-TS-01", inventory: 200, vendor: "BELLE AME MINI", tags: "tshirt, graphic, kids, cotton",
    features: ["Organic Cotton", "Breathable Print", "Tagless Neck"],
    variants: ["S", "M", "L"]
  },
  { 
    name: "Denim Button-Down Shirt", 
    price: "3154.00",
    description: "A stylish denim shirt for the little ones. Durable enough for the playground.", 
    imageUrl: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&q=80", 
    department: "Kids", category: "Shirts",
    sku: "BME-K-SH-01", inventory: 55, vendor: "BELLE AME MINI", tags: "shirt, denim, kids, stylish",
    features: ["Heavy Duty Buttons", "Reinforced Elbows", "Soft-Wash Denim"],
    variants: ["3T", "4T", "5", "6"]
  },
  { 
    name: "Puffer Warmth Jacket", 
    price: "6225.00", compareAtPrice: "7885.00",
    description: "Insulated and water-resistant. Keeps them warm and dry in the coldest weather.", 
    imageUrl: "https://images.unsplash.com/photo-1515233261667-d8ad62106180?auto=format&fit=crop&q=80", 
    department: "Kids", category: "Jackets",
    sku: "BME-K-JK-01", inventory: 60, vendor: "BELLE AME MINI", tags: "jacket, puffer, kids, winter",
    features: ["Down Alternative Fill", "Detachable Hood", "Reflective safety strips"],
    variants: ["S", "M", "L"]
  },
  { 
    name: "Daily Play Sneakers", 
    price: "4565.00",
    description: "Easy-on sneakers with elastic laces. Designed for comfort and support during play.", 
    imageUrl: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80", 
    department: "Kids", category: "Footwear",
    sku: "BME-K-FW-01", inventory: 100, vendor: "BELLE AME MINI", tags: "sneakers, footwear, kids, elastic",
    features: ["Elastic Laces", "Non-marking Sole", "Padded Collar"],
    variants: ["10", "11", "12", "13", "1"]
  },

  // --- ACCESSORIES ---
  { 
    name: "Signature Leather Belt", 
    price: "5395.00",
    description: "Italian leather belt with a minimalist silver buckle. A timeless accessory for any outfit.", 
    imageUrl: "https://images.unsplash.com/photo-1554444577-be9422559784?auto=format&fit=crop&q=80", 
    department: "Men", category: "Accessories",
    sku: "BME-A-AC-01", inventory: 70, vendor: "BELLE AME ACC", tags: "belt, leather, men, luxury",
    features: ["Full Grain Leather", "Silver-Finished Buckle", "Hand-stitched Edge"],
    variants: ["32", "34", "36"]
  },
  { 
    name: "Silk Neck Scarf", 
    price: "3735.00",
    description: "Add a touch of elegance to your look with this hand-finished silk scarf.", 
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80", 
    department: "Women", category: "Accessories",
    sku: "BME-A-AC-02", inventory: 100, vendor: "BELLE AME ACC", tags: "scarf, silk, women, accessory",
    features: ["100% Silk", "Hand-rolled Edges", "Unique Print"],
    variants: ["One Size"]
  }
];

async function main() {
  console.log("Emptying old database records to reset IDs...");
  await db.delete(products);

  console.log(`Seeding ${seedProducts.length} diverse products...`);
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
