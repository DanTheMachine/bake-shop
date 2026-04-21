import { PrismaClient, ProductCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample products
  const products: Array<{
    name: string;
    description: string;
    category: ProductCategory;
    price: number;
    images: string[];
    available: boolean;
    requiresCustomForm: boolean;
  }> = [
    {
      name: 'Classic Chocolate Cake',
      description: 'Rich, moist chocolate cake with smooth chocolate ganache. A crowd favorite!',
      category: ProductCategory.READY_MADE,
      price: 35.00,
      images: ['https://placehold.co/400x400/FF6B9D/white?text=Chocolate+Cake'],
      available: true,
      requiresCustomForm: false,
    },
    {
      name: 'Vanilla Bean Cupcakes (6-pack)',
      description: 'Light and fluffy vanilla cupcakes topped with buttercream frosting.',
      category: ProductCategory.READY_MADE,
      price: 18.00,
      images: ['https://placehold.co/400x400/FFE5B4/333?text=Cupcakes'],
      available: true,
      requiresCustomForm: false,
    },
    {
      name: 'Strawberry Shortcake',
      description: 'Fresh strawberries layered with vanilla sponge and whipped cream.',
      category: ProductCategory.SEASONAL,
      price: 42.00,
      images: ['https://placehold.co/400x400/E1BEE7/white?text=Strawberry'],
      available: true,
      requiresCustomForm: false,
    },
    {
      name: 'Custom Birthday Cake',
      description: 'Personalized birthday cake designed exactly to your specifications. Choose flavors, colors, and decorations.',
      category: ProductCategory.CUSTOM_CAKE,
      price: 75.00,
      images: ['https://placehold.co/400x400/A8E6CF/white?text=Custom+Cake'],
      available: true,
      requiresCustomForm: true,
    },
    {
      name: 'Assorted Cookie Box',
      description: 'A delightful mix of our best cookies: chocolate chip, oatmeal raisin, and sugar cookies.',
      category: ProductCategory.GIFT_BOX,
      price: 25.00,
      images: ['https://placehold.co/400x400/FF8BA7/white?text=Cookie+Box'],
      available: true,
      requiresCustomForm: false,
    },
    {
      name: 'Lemon Blueberry Loaf',
      description: 'Tangy lemon cake studded with fresh blueberries, finished with a sweet glaze.',
      category: ProductCategory.READY_MADE,
      price: 22.00,
      images: ['https://placehold.co/400x400/FFC75F/white?text=Lemon+Loaf'],
      available: true,
      requiresCustomForm: false,
    },
    {
      name: 'Red Velvet Cake',
      description: 'Classic red velvet with cream cheese frosting. Perfect for any celebration.',
      category: ProductCategory.READY_MADE,
      price: 38.00,
      images: ['https://placehold.co/400x400/C70D4F/white?text=Red+Velvet'],
      available: true,
      requiresCustomForm: false,
    },
    {
      name: 'Holiday Gift Basket',
      description: 'Seasonal assortment of cookies, brownies, and festive treats beautifully packaged.',
      category: ProductCategory.GIFT_BOX,
      price: 55.00,
      images: ['https://placehold.co/400x400/D48806/white?text=Gift+Basket'],
      available: false, // Seasonal item
      requiresCustomForm: false,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('✅ Created sample products');

  // Create admin user
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@sweetdelights.com',
      role: 'admin',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
