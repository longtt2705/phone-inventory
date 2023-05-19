import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export default () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma;
};
