// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some categories
  const category1 = await prisma.category.create({
    data: {
      name: 'Electronics',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Books',
    },
  });

  // Create some products
  await prisma.product.create({
    data: {
      name: 'Laptop',
      description: 'Powerful laptop for work and play',
      price: 1299.99,
      imageUrl: 'https://via.placeholder.com/300', // Replace with a real image URL
      categoryId: category1.id,
      stockQuantity: 10,
    },
  });

  await prisma.product.create({
    data: {
      name: 'The Hitchhiker\'s Guide to the Galaxy',
      description: 'A classic science fiction comedy',
      price: 12.99,
      imageUrl: 'https://via.placeholder.com/300',
      categoryId: category2.id,
      stockQuantity: 25,
    },
  });
    await prisma.product.create({
    data: {
      name: 'Smartphone',
      description: 'Latest smartphone with great camera',
      price: 799.99,
      imageUrl: 'https://via.placeholder.com/300',
      categoryId: category1.id,
        stockQuantity: 50
    },
  });
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });