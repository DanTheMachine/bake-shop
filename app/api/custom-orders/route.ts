import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendCustomRequestConfirmation, sendAdminCustomRequestNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      eventDate,
      cakeSize,
      flavors,
      designDescription,
      budget,
    } = body as {
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      eventDate: string;
      cakeSize: string;
      flavors: string;
      designDescription: string;
      budget?: string;
    };

    if (!customerName || !customerEmail || !customerPhone || !eventDate || !cakeSize || !flavors || !designDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const order = await prisma.customOrderRequest.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        eventDate: new Date(eventDate),
        cakeSize,
        flavors,
        designDescription,
        referenceImages: [],
        budget: budget ?? null,
        status: 'PENDING',
      },
    });

    await Promise.all([
      sendCustomRequestConfirmation({ to: customerEmail, customerName, cakeSize, eventDate }),
      sendAdminCustomRequestNotification({ customerName, customerEmail, customerPhone, cakeSize, eventDate, flavors, designDescription, budget }),
    ]);

    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error('Custom order creation failed:', err);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}
