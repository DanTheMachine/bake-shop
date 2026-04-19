import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  if (!productId) return NextResponse.json({ error: 'productId required' }, { status: 400 });

  const reviews = await prisma.review.findMany({
    where: { productId, approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  const { productId, authorName, rating, comment } = await request.json() as {
    productId: string;
    authorName: string;
    rating: number;
    comment?: string;
  };

  if (!productId || !authorName || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Invalid review data' }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: { productId, authorName, rating, comment: comment ?? null, approved: false },
  });

  return NextResponse.json(review, { status: 201 });
}
