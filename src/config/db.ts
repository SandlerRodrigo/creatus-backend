import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('MongoDB conectado...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
export { prisma };