const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Financial Intelligence" },
        { name: "Real Estate" },
        { name: "Family Advisory" },
        { name: "Tech & Products" },
        { name: "Personal Devlopment" },
        { name: "School of Sales" },
        { name: "Filming" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();