import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = [
    {
      name: "Nebula Junior // 01",
      description: "Organic cotton tee with holographic print. Designed for the next generation of pioneers.",
      price: 45,
      imageUrl: "https://images.unsplash.com/photo-1519702465767-3bc140ad3a94?auto=format&fit=crop&q=80",
      category: "T-Shirts",
      department: "Kids",
      inventory: 50,
      isFeatured: true,
      sku: "KID-TEE-01",
      vendor: "BELLE AME",
      tags: "kids, tee, organic"
    },
    {
      name: "Flux Joggers // Kids",
      description: "Weather-resistant technical joggers with adjustable waist. Built for high-activity play.",
      price: 65,
      imageUrl: "https://images.unsplash.com/photo-1519233940173-09756eba181e?auto=format&fit=crop&q=80",
      category: "Pants",
      department: "Kids",
      inventory: 40,
      isFeatured: false,
      sku: "KID-PNT-02",
      vendor: "BELLE AME",
      tags: "kids, pants, durable"
    },
    {
      name: "Aura Mini Shield",
      description: "Recycled polyester windbreaker with reflective accents. Safety meets style.",
      price: 85,
      imageUrl: "https://images.unsplash.com/photo-1544126592-807daa215a75?auto=format&fit=crop&q=80",
      category: "Accessories",
      department: "Kids",
      inventory: 30,
      isFeatured: true,
      sku: "KID-ACC-03",
      vendor: "BELLE AME",
      tags: "kids, jacket, shield"
    }
  ];

  try {
    for (const product of products) {
      await prisma.product.create({
        data: product
      });
    }
    return NextResponse.json({ message: "Seeded 3 Kids products successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
