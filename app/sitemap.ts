import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  const products = await prisma.product.findMany({
    where: { available: true },
    select: { id: true, updatedAt: true },
  }).catch(() => []);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: appUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${appUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${appUrl}/custom-cakes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map(p => ({
    url: `${appUrl}/shop/${p.id}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
