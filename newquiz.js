import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const newquiz = await prisma.quiz.create({
    data: {
        title: "All Things NBA",
        category: "sports",
        description: "Think you know a lot about the NBA? Take this test and see how you really stack up in the world of basketball aficionados!",
    },
});
