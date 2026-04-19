import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmation } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderNumber = session.client_reference_id;

    if (orderNumber) {
      const order = await prisma.order.update({
        where: { orderNumber },
        data: { paymentStatus: 'PAID' },
        include: { items: true },
      });

      await sendOrderConfirmation({
        to: order.customerEmail,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        items: order.items.map(i => ({
          productId: i.productId ?? '',
          productName: i.productName,
          quantity: i.quantity,
          unitPrice: Number(i.unitPrice),
        })),
        total: Number(order.totalAmount),
        pickupDate: order.pickupDate?.toISOString() ?? '',
        paymentMethod: 'online',
      });
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderNumber = session.client_reference_id;

    if (orderNumber) {
      await prisma.order.update({
        where: { orderNumber },
        data: { paymentStatus: 'FAILED' },
      });
    }
  }

  return NextResponse.json({ received: true });
}
