import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import HR from "~/components/HR";
import { prisma } from "~/utils/db.server";
import Quiz from "./Quiz";

export async function loader({ params }: LoaderArgs) {
    if (isNaN(Number(params.id))) {
        throw new Response(null, {
            status: 404,
            statusText: "Not a valid Quiz ID",
        });
    }
    let quiz = await prisma.quiz.findUnique({
        where: {
            id: Number(params.id),
        },
        include: {
            questions: {
                include: {
                    answers: true,
                },
            },
        },
    });
    if (!quiz) {
        throw new Response(null, {
            status: 404,
            statusText: "Error finding quiz",
        });
    }
    return json({
        quiz: quiz,
    });
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
    return [
        {
            title:
                (data?.quiz.title == undefined
                    ? "No quiz found"
                    : `Quiz: ${data?.quiz.title}`) + ` | quikTriv quiz maker`,
        },
    ];
};

export default function QuizDisplay() {
    const { quiz } = useLoaderData<typeof loader>();
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
            <Quiz quiz={quiz} />
        </>
    );
}
