import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email')?.toLowerCase().trim();

  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

  const orders = await prisma.order.findMany({
    where: { customerEmail: { equals: email, mode: 'insensitive' } },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return NextResponse.json(orders);
}
