import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { generateOrderNumber } from '@/lib/utils';
import { sendAdminOrderNotification } from '@/lib/email';
import type { CartItem } from '@/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      pickupDate,
      specialInstructions,
      items,
      total,
    } = body as {
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      pickupDate: string;
      specialInstructions?: string;
      items: CartItem[];
      total: number;
    };

    if (!customerName || !customerEmail || !customerPhone || !pickupDate || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      client_reference_id: orderNumber,
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.productName },
          unit_amount: Math.round(item.unitPrice * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}`,
      cancel_url: `${appUrl}/checkout`,
      metadata: {
        orderNumber,
        customerPhone,
        pickupDate,
        specialInstructions: specialInstructions ?? '',
      },
    });

    await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        pickupDate: new Date(pickupDate),
        totalAmount: total,
        specialInstructions: specialInstructions ?? null,
        paymentStatus: 'PENDING',
        fulfillmentStatus: 'RECEIVED',
        stripePaymentIntentId: session.id,
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

    await sendAdminOrderNotification({
      orderNumber, customerName, customerEmail, customerPhone,
      items, total, pickupDate, paymentMethod: 'Online (Stripe)',
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout failed:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
