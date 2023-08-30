import { Prisma } from "@prisma/client";
import { type ActionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/utils/db.server";
import { NewQuizData } from "~/utils/types";

export const action = async ({ request }: ActionArgs) => {
    const data = JSON.parse(
        (await request.formData()).get("data") as string
    ) as NewQuizData;
    const newQuiz = await prisma.quiz.create({
        data: {
            category: data.category,
            description: data.description,
            title: data.title,
            questions: {
                create: data.questions.map((question) => ({
                    text: question.title,
                    answers: {
                        create: question.answers.map((answer, answerIndex) => ({
                            text: answer,
                            correct: question.correctAnswer == answerIndex,
                        })),
                    },
                })),
            },
        },
        include: {
            questions: {
                include: {
                    answers: true,
                },
            },
        },
    });
    if (newQuiz) {
        return redirect(
            `/quiz/new/success?id=${newQuiz.id}&?title=${newQuiz.title}`
        );
    } else {
        return redirect("/quiz/new/failed");
    }
};

export const loader = async () => redirect("/");
