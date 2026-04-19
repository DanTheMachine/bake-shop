import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const [totalOrders, activeOrders, revenue, pendingCustomRequests] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({
      where: { fulfillmentStatus: { in: ['RECEIVED', 'PREPARING', 'READY'] } },
    }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { paymentStatus: { in: ['PAID', 'CASH_ON_PICKUP'] } },
    }),
    prisma.customOrderRequest.count({
      where: { status: 'PENDING' },
    }),
  ]);

  return NextResponse.json({
    totalOrders,
    activeOrders,
    revenue: Number(revenue._sum.totalAmount ?? 0),
    pendingCustomRequests,
  });
}
