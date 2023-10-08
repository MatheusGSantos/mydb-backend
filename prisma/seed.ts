import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const gasCategory = await prisma.categories.upsert({
    where: { name: 'gas' },
    update: {},
    create: {
      name: 'gas',
      description: 'Carro movido a gasolina',
      icon: 'gas',
    },
  });

  const electricCategory = await prisma.categories.upsert({
    where: { name: 'electric' },
    update: {},
    create: {
      name: 'electric',
      description: 'Carro movido a eletricidade',
      icon: 'electric',
    },
  });

  const alcoholCategory = await prisma.categories.upsert({
    where: { name: 'alcohol' },
    update: {},
    create: {
      name: 'alcohol',
      description: 'Carro movido a alcool',
      icon: 'alcohol',
    },
  });

  await prisma.cars.upsert({
    where: { licensePlate: 'AAA9A99' },
    update: {},
    create: {
      licensePlate: 'AAA9A99',
      brand: 'Porsche',
      dailyRate: 430,
      fineAmount: 500,
      categoryId: electricCategory.id,
      name: 'Panamera 4',
      description: 'Porsche Panamera 4 2015',
      available: true,
      carImage: 'Porsche.png',
    },
  });

  await prisma.cars.upsert({
    where: { licensePlate: 'AAA9B99' },
    update: {},
    create: {
      licensePlate: 'AAA9B99',
      brand: 'Volvo',
      dailyRate: 450,
      fineAmount: 460,
      categoryId: gasCategory.id,
      name: 'XC90',
      description: 'Volvo XC90 2019',
      available: true,
      carImage: 'Volvo.png',
    },
  });
  await prisma.cars.upsert({
    where: { licensePlate: 'AAA9C99' },
    update: {},
    create: {
      licensePlate: 'AAA9C99',
      brand: 'Lamborghini',
      dailyRate: 580,
      fineAmount: 650,
      categoryId: alcoholCategory.id,
      name: 'Huracan',
      description: 'Lamborghini Huracan',
      available: true,
      carImage: 'Lambo.png',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
