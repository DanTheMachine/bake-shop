import { Resend } from 'resend';
import { formatPrice, formatDate } from '@/lib/utils';
import type { CartItem } from '@/types';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.RESEND_FROM_EMAIL ?? 'Rise by Amy <onboarding@resend.dev>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? '';

async function send(to: string, subject: string, html: string) {
  if (!resend || !to) return;
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (err) {
    console.error('[email] send failed:', err);
  }
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const wrap = (body: string) => `
<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{font-family:Inter,Arial,sans-serif;background:#FFFBF5;margin:0;padding:0}
  .container{max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06)}
  .header{background:linear-gradient(135deg,#FF6B9D,#FFB3CC);padding:32px 24px;text-align:center}
  .header h1{color:#fff;margin:0;font-size:22px;font-weight:700}
  .header p{color:rgba(255,255,255,.85);margin:6px 0 0;font-size:14px}
  .body{padding:28px 24px}
  .label{font-size:11px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
  .value{font-size:15px;color:#333;margin:0 0 16px}
  .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#555}
  .total{display:flex;justify-content:space-between;padding:12px 0 0;font-weight:700;font-size:16px;color:#333}
  .badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600}
  .footer{background:#FFF4E0;padding:16px 24px;text-align:center;font-size:12px;color:#999}
  .footer a{color:#FF6B9D;text-decoration:none}
  .btn{display:inline-block;background:#FF6B9D;color:#fff;padding:12px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;margin:16px 0}
</style></head><body>
<div class="container">${body}</div>
</body></html>`;

// ─── Customer: order confirmed ─────────────────────────────────────────────────
export async function sendOrderConfirmation({
  to, orderNumber, customerName, items, total, pickupDate, paymentMethod,
}: {
  to: string;
  orderNumber: string;
  customerName: string;
  items: CartItem[];
  total: number;
  pickupDate: string;
  paymentMethod: 'cash' | 'online';
}) {
  const itemRows = items.map(i =>
    `<div class="row"><span>${i.productName} × ${i.quantity}</span><span>${formatPrice(i.unitPrice * i.quantity)}</span></div>`
  ).join('');

  const html = wrap(`
    <div class="header">
      <h1>Order Confirmed! 🎉</h1>
      <p>Thanks for your order, ${customerName}</p>
    </div>
    <div class="body">
      <p class="label">Order Number</p>
      <p class="value" style="font-weight:700;color:#FF6B9D">${orderNumber}</p>

      <p class="label">Pickup Date</p>
      <p class="value">${formatDate(pickupDate)}</p>

      <p class="label">Payment</p>
      <p class="value">${paymentMethod === 'cash' ? 'Cash on Pickup' : 'Paid Online'}</p>

      <p class="label" style="margin-top:8px">Your Items</p>
      ${itemRows}
      <div class="total"><span>Total</span><span>${formatPrice(total)}</span></div>

      <p style="margin-top:24px;color:#666;font-size:14px">
        We'll be in touch to confirm your pickup time. If you have any questions, just reply to this email!
      </p>
    </div>
    <div class="footer">Rise by Amy · Purely Proofed 🧁</div>
  `);

  await send(to, `Order Confirmed — ${orderNumber}`, html);
}

// ─── Admin: new order ──────────────────────────────────────────────────────────
export async function sendAdminOrderNotification({
  orderNumber, customerName, customerEmail, customerPhone, items, total, pickupDate, paymentMethod,
}: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  pickupDate: string;
  paymentMethod: string;
}) {
  if (!ADMIN_EMAIL) return;

  const itemRows = items.map(i =>
    `<div class="row"><span>${i.productName} × ${i.quantity}</span><span>${formatPrice(i.unitPrice * i.quantity)}</span></div>`
  ).join('');

  const html = wrap(`
    <div class="header">
      <h1>New Order Received 📦</h1>
      <p>${orderNumber}</p>
    </div>
    <div class="body">
      <p class="label">Customer</p>
      <p class="value">${customerName}<br><span style="font-size:13px;color:#777">${customerEmail} · ${customerPhone}</span></p>

      <p class="label">Pickup Date</p>
      <p class="value">${formatDate(pickupDate)}</p>

      <p class="label">Payment Method</p>
      <p class="value">${paymentMethod}</p>

      <p class="label" style="margin-top:8px">Items</p>
      ${itemRows}
      <div class="total"><span>Total</span><span>${formatPrice(total)}</span></div>
    </div>
    <div class="footer">Rise by Amy Admin</div>
  `);

  await send(ADMIN_EMAIL, `New Order: ${orderNumber} — ${customerName}`, html);
}

// ─── Customer: custom request received ────────────────────────────────────────
export async function sendCustomRequestConfirmation({
  to, customerName, cakeSize, eventDate,
}: {
  to: string;
  customerName: string;
  cakeSize: string;
  eventDate: string;
}) {
  const html = wrap(`
    <div class="header">
      <h1>Request Received! 🎂</h1>
      <p>We'll be in touch within 24–48 hours</p>
    </div>
    <div class="body">
      <p style="color:#555;font-size:15px">Hi ${customerName},</p>
      <p style="color:#555;font-size:14px;line-height:1.6">
        Thank you for your custom cake request! We've received your details and will send you a personalized quote within <strong>24–48 hours</strong>.
      </p>

      <p class="label">Cake Size</p>
      <p class="value">${cakeSize}</p>

      <p class="label">Event Date</p>
      <p class="value">${formatDate(eventDate)}</p>

      <p style="color:#888;font-size:13px;margin-top:20px">
        Questions? Just reply to this email — we'd love to chat about your vision!
      </p>
    </div>
    <div class="footer">Rise by Amy · Purely Proofed 🧁</div>
  `);

  await send(to, 'Custom Cake Request Received — Rise by Amy', html);
}

// ─── Admin: new custom request ─────────────────────────────────────────────────
export async function sendAdminCustomRequestNotification({
  customerName, customerEmail, customerPhone, cakeSize, eventDate, flavors, designDescription, budget,
}: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  cakeSize: string;
  eventDate: string;
  flavors: string;
  designDescription: string;
  budget?: string;
}) {
  if (!ADMIN_EMAIL) return;

  const html = wrap(`
    <div class="header">
      <h1>New Custom Cake Request 🎂</h1>
      <p>${customerName}</p>
    </div>
    <div class="body">
      <p class="label">Customer</p>
      <p class="value">${customerName}<br><span style="font-size:13px;color:#777">${customerEmail} · ${customerPhone}</span></p>

      <p class="label">Event Date</p>
      <p class="value">${formatDate(eventDate)}</p>

      <p class="label">Cake Size</p>
      <p class="value">${cakeSize}</p>

      <p class="label">Flavors</p>
      <p class="value">${flavors}</p>

      <p class="label">Design Description</p>
      <p class="value" style="white-space:pre-wrap">${designDescription}</p>

      ${budget ? `<p class="label">Budget</p><p class="value">${budget}</p>` : ''}
    </div>
    <div class="footer">Rise by Amy Admin</div>
  `);

  await send(ADMIN_EMAIL, `New Custom Cake Request — ${customerName}`, html);
}

// ─── Customer: order status update ────────────────────────────────────────────
const STATUS_MESSAGES: Record<string, { emoji: string; headline: string; body: string }> = {
  PREPARING: { emoji: '👩‍🍳', headline: "We're baking your order!", body: "Your treats are in the oven. We'll let you know when they're ready for pickup." },
  READY: { emoji: '🎉', headline: "Your order is ready!", body: "Come pick up your goodies whenever you're ready. We can't wait for you to taste them!" },
  COMPLETED: { emoji: '💕', headline: "Order complete!", body: "Thank you so much for your order. We hope you loved every bite!" },
  CANCELLED: { emoji: '😢', headline: "Order cancelled", body: "Your order has been cancelled. Please contact us if you have any questions." },
};

export async function sendOrderStatusUpdate({
  to, customerName, orderNumber, fulfillmentStatus,
}: {
  to: string;
  customerName: string;
  orderNumber: string;
  fulfillmentStatus: string;
}) {
  const msg = STATUS_MESSAGES[fulfillmentStatus];
  if (!msg) return;

  const html = wrap(`
    <div class="header">
      <h1>${msg.emoji} ${msg.headline}</h1>
      <p>Order ${orderNumber}</p>
    </div>
    <div class="body">
      <p style="color:#555;font-size:15px">Hi ${customerName},</p>
      <p style="color:#555;font-size:14px;line-height:1.6">${msg.body}</p>
    </div>
    <div class="footer">Rise by Amy · Purely Proofed 🧁</div>
  `);

  await send(to, `${msg.emoji} ${msg.headline} — ${orderNumber}`, html);
}
