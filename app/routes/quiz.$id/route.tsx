import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";
import type { V2_MetaFunction } from "@remix-run/node";
import HR from "~/components/HR";
import Quiz from "./Quiz";

export async function loader({ params }: LoaderArgs) {
    return json({
        quiz: await prisma.quiz.findUniqueOrThrow({
            where: {
                id: Number(params.id),
            },
        }),
        questions: await prisma.question.findMany({
            where: {
                quizId: Number(params.id),
            },
        }),
    });
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
    return [{ title: `Quiz: ${data?.quiz.title}` }];
};

export default function QuizDisplay() {
    const { quiz, questions } = useLoaderData<typeof loader>();
    return (
        <>
            <div className="text-center">
                <p className="uppercase tracking-[0.25em]">play this quiz</p>
                <h1>{quiz.title}</h1>
                <p className="text-lg mt-6 w-4/5 mx-auto p-4 rounded border border-neutral">
                    {quiz.description}
                </p>
            </div>
            <HR />
            <Quiz quiz={quiz} questions={questions} />
        </>
    );
}
