import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = await prisma.customOrderRequest.findUnique({ where: { id } });
  if (!req) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(req);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { status, quotedPrice, adminNotes } = body as {
    status?: string;
    quotedPrice?: number;
    adminNotes?: string;
  };

  const updated = await prisma.customOrderRequest.update({
    where: { id },
    data: {
      ...(status && { status: status as never }),
      ...(quotedPrice !== undefined && { quotedPrice }),
      ...(adminNotes !== undefined && { adminNotes }),
    },
  });

  return NextResponse.json(updated);
}
