import { Prisma, PrismaClient, Question } from "@prisma/client";

let db: PrismaClient;

declare global {
    // sourcery skip: avoid-using-var
    var __db__: PrismaClient | undefined;
}

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// In production, we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
    db = new PrismaClient();
} else {
    if (!global.__db__) {
        global.__db__ = new PrismaClient();
    }
    db = global.__db__;
    db.$connect();
}

function shuffle(array: Array<any>) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

export { db as prisma };
