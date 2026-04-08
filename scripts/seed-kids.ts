import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Nebula Junior // 01",
      description: "Organic cotton tee with holographic print. Designed for the next generation of pioneers.",
      price: 45,
      imageUrl: "https://images.unsplash.com/photo-1519702465767-3bc140ad3a94?auto=format&fit=crop&q=80",
      category: "T-Shirts",
      department: "Kids",
      stock: 50,
      isFeatured: true
    },
    {
      name: "Flux Joggers // Kids",
      description: "Weather-resistant technical joggers with adjustable waist. Built for high-activity play.",
      price: 65,
      imageUrl: "https://images.unsplash.com/photo-1519233940173-09756eba181e?auto=format&fit=crop&q=80",
      category: "Pants",
      department: "Kids",
      stock: 40,
      isFeatured: false
    },
    {
      name: "Aura Mini Shield",
      description: "Recycled polyester windbreaker with reflective accents. Safety meets style.",
      price: 85,
      imageUrl: "https://images.unsplash.com/photo-1544126592-807daa215a75?auto=format&fit=crop&q=80",
      category: "Accessories",
      department: "Kids",
      stock: 30,
      isFeatured: true
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }
  console.log("Seeded 3 Kids products.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
