import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default prisma; 

/*import pkg from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const { PrismaClient } = pkg;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma; 



import pkg from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";


const { PrismaClient } = pkg;

const sql = neon(process.env.DATABASE_URL);

const adapter = new PrismaNeon(sql);

const prisma = new PrismaClient({
  adapter,
});

export default prisma; */
