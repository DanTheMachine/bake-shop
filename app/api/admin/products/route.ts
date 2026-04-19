import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, category, price, available } = body as {
    name: string;
    description: string;
    category: string;
    price: number;
    available: boolean;
  };

  if (!name || !description || !category || price === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: { name, description, category: category as never, price, images: [], available: available ?? true },
  });

  return NextResponse.json(product, { status: 201 });
}
