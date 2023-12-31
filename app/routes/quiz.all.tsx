import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";
import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "All Quizzes | quikTriv quiz maker" },
        { name: "description", content: "Make easy fun quizzes with quikTriv" },
    ];
};

export const loader = async () => {
    return json({
        quizzes: await prisma.quiz.findMany({
            include: {
                _count: {
                    select: {
                        questions: true,
                    },
                },
            },
        }),
    });
};

export default function AllQuizzes() {
    const { quizzes } = useLoaderData<typeof loader>();
    return (
        <>
            <h1>All Quizzes</h1>
            <div className="grid grid-cols-3 gap-4 w-full">
                {quizzes.length == 0 ? (
                    <div className="p-8 rounded bg-base-200 text-2xl font-light col-span-full text-center">
                        No quizzes made?{" "}
                        <Link
                            to="/quiz/new"
                            className="font-bold text-primary hover:underline"
                        >
                            Why don't you create one?
                        </Link>
                    </div>
                ) : (
                    quizzes.map((quiz, index) => (
                        <Link
                            className="p-8 bg-base-200 rounded-xl text-center space-y-2"
                            key={quiz.id}
                            to={`/quiz/${quiz.id}`}
                        >
                            <p className="text-3xl font-extralight uppercase">
                                {quiz.title}
                            </p>
                            <p className="text-sm line-clamp-2">
                                {quiz.description}
                            </p>
                            <p
                                className={`font-bold uppercase text-sm ${
                                    index % 2 == 0
                                        ? "text-secondary"
                                        : "text-accent"
                                }`}
                            >
                                {quiz._count.questions} question
                                {quiz._count.questions === 1 ? "" : "s"}
                            </p>
                        </Link>
                    ))
                )}
            </div>
            <p className="uppercase">
                Total Quizzes:{" "}
                <span className="font-black font-mono bg-neutral p-1 rounded">
                    {quizzes.length}
                </span>
            </p>
        </>
    );
}
