import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: {username: 'manus1235' },
    create: {
        username: 'manus1235',
        email: 'j.mateusz@op.pl',
        phoneNumber: '+48533689329',
        password: 'password',
    },
    update: {},
    });
  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });