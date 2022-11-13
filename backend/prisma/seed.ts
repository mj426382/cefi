import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: {username: 'manus1235' },
    create: {
        username: 'manus1235',
        email: 'j.mateusz@op.pl',
        phoneNumber: '+48533689329',
        password: '$2b$10$U8cx.ZyqSKbCp.34SeluIevFTEhVqJOYTZ1nFyZFKInyXbfTgsVZK',
    },
    update: {},
    });
  const currency = await prisma.currency.upsert({
    where: {
      symbol: 'PLN'
    },
    create: {
      symbol: 'PLN',
      name: 'POLISH ZLOTY',
    },
    update: {}
  })
  const userCurrency = await prisma.userCurrencyBalance.upsert({
    where: {
      currencyId_userId: {
        currencyId: currency.id,
        userId: user.id,
      }
    },
    create: {
      currencyId: currency.id,
      userId: user.id,
      balance: 10000,
    },
    update: {},
  })
  console.log({ user, currency, userCurrency });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });