import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOrderNumber } from '@/lib/utils';
import { sendOrderConfirmation, sendAdminOrderNotification } from '@/lib/email';
import type { CartItem } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      pickupDate,
      specialInstructions,
      paymentMethod,
      items,
      total,
    } = body as {
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      pickupDate: string;
      specialInstructions?: string;
      paymentMethod: 'online' | 'cash';
      items: CartItem[];
      total: number;
    };

    if (!customerName || !customerEmail || !customerPhone || !pickupDate || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        pickupDate: new Date(pickupDate),
        totalAmount: total,
        specialInstructions: specialInstructions || null,
        paymentStatus: paymentMethod === 'cash' ? 'CASH_ON_PICKUP' : 'PENDING',
        fulfillmentStatus: 'RECEIVED',
        items: {
          create: items.map((item: CartItem) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
    });

    await Promise.all([
      sendOrderConfirmation({ to: customerEmail, orderNumber, customerName, items, total, pickupDate, paymentMethod }),
      sendAdminOrderNotification({ orderNumber, customerName, customerEmail, customerPhone, items, total, pickupDate, paymentMethod }),
    ]);

    return NextResponse.json({ orderNumber: order.orderNumber });
  } catch (err) {
    console.error('Order creation failed:', err);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
