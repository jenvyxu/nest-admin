import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { generateOrderNo } from '../../src/utils';

const prisma = new PrismaClient();

const createData = new Array(120).fill({}).map((item) => ({
  service: faker.lorem.paragraph(2),
  no: generateOrderNo(),
  clientName: faker.person.fullName(),
  clientAddress: faker.lorem.paragraph(3),
  clientTel: faker.phone.number(),
  price: faker.finance.amount({ min: 5, max: 10000 }),
  finalPrice: faker.finance.amount({ min: 5, max: 10000 }),
  status: faker.helpers.arrayElement([
    'created',
    'process',
    'complete',
    'review',
    'fail',
  ]) as any,
  review: faker.lorem.paragraph(2),
  note: faker.lorem.paragraph(2),
  visitAt: faker.date.anytime({ refDate: new Date() }),
  finishAt: faker.date.anytime({ refDate: new Date() }),
  expireAt: faker.date.anytime({ refDate: new Date() }),
}));

async function main() {
  await prisma.order.createMany({
    data: createData,
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
