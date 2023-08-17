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
        quizzes: await prisma.quiz.findMany(),
        quizCount: await prisma.quiz.count(),
    });
};

export default function AllQuizzes() {
    const { quizzes, quizCount } = useLoaderData<typeof loader>();
    return (
        <>
            <h1>All Quizzes</h1>
            <div className="grid grid-cols-3 gap-4">
                {quizzes.map((quiz) => (
                    <Link
                        className="p-8 bg-base-200 rounded-xl text-center space-y-2"
                        key={quiz.id}
                        to={`/quiz/${quiz.id}`}
                    >
                        <p className="text-3xl font-extralight uppercase">
                            {quiz.title}
                        </p>
                        <p className="text-sm">{quiz.description}</p>
                    </Link>
                ))}
            </div>
            <p className="uppercase">
                Total Quizzes:{" "}
                <span className="font-black font-mono bg-neutral p-1 rounded">
                    {quizCount}
                </span>
            </p>
        </>
    );
}
