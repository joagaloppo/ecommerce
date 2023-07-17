// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const brand1 = await prisma.brand.create({
        data: {
            brandName: 'Apple',
            PhoneModel: {
                create: [
                    { modelName: 'iPhone 13' },
                    { modelName: 'iPhone 12' },
                    // More models
                ],
            },
        },
    });

    const brand2 = await prisma.brand.create({
        data: {
            brandName: 'Samsung',
            PhoneModel: {
                create: [
                    { modelName: 'Galaxy S21' },
                    { modelName: 'Galaxy Note20' },
                    // More models as needed
                ],
            },
        },
    });

    console.log({ brand1, brand2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
