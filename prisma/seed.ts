import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const gasCategory = await prisma.categories.upsert({
    where: { name: 'gas' },
    update: {},
    create: {
      name: 'gas',
      description: 'Carro movido a gasolina',
      icon: 'gas',
    },
  })

  const electricCategory = await prisma.categories.upsert({
    where: { name: 'electric' },
    update: {},
    create: {
      name: 'electric',
      description: 'Carro movido a eletricidade',
      icon: 'electric',
    },
  })

  const alcoholCategory = await prisma.categories.upsert({
    where: { name: 'alcohol' },
    update: {},
    create: {
      name: 'alcohol',
      description: 'Carro movido a alcool',
      icon: 'alcohol',
    },
  })

  await prisma.cars.upsert({
    where: { licensePlate: 'AAA9A99' },
    update: {},
    create: {
      licensePlate: 'AAA9A99',
      brand: 'Fiat',
      dailyRate: 100,
      fineAmount: 50,
      categoryId: gasCategory.id,
      name: 'Uno',
      description: 'Carro popular da Fiat',
      available: true,
      carImage: 'fiat-uno.png',
    },
  })

  await prisma.cars.upsert({
    where: { licensePlate: 'AAA9B99' },
    update: {},
    create: {
      licensePlate: 'AAA9B99',
      brand: 'Honda',
      dailyRate: 150,
      fineAmount: 75,
      categoryId: electricCategory.id,
      name: 'Civic',
      description: 'Carro popular da Honda',
      available: true,
      carImage: 'honda-civic.png',
    },
  })
  await prisma.cars.upsert({
    where: { licensePlate: 'AAA9C99' },
    update: {},
    create: {
      licensePlate: 'AAA9C99',
      brand: 'McLaren',
      dailyRate: 150,
      fineAmount: 75,
      categoryId: alcoholCategory.id,
      name: 'P1',
      description: 'Carro da McLaren',
      available: true,
      carImage: 'mclaren-p1.png',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })