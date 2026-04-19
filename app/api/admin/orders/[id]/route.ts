import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOrderStatusUpdate } from '@/lib/email';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(order);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { fulfillmentStatus, paymentStatus } = body as {
    fulfillmentStatus?: string;
    paymentStatus?: string;
  };

  const order = await prisma.order.update({
    where: { id },
    data: {
      ...(fulfillmentStatus && { fulfillmentStatus: fulfillmentStatus as never }),
      ...(paymentStatus && { paymentStatus: paymentStatus as never }),
    },
    include: { items: true },
  });

  if (fulfillmentStatus) {
    await sendOrderStatusUpdate({
      to: order.customerEmail,
      customerName: order.customerName,
      orderNumber: order.orderNumber,
      fulfillmentStatus,
    });
  }

  return NextResponse.json(order);
}
