import { Prisma } from "@prisma/client";
import { type ActionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/utils/db.server";
import { NewQuizData } from "~/utils/types";

export const action = async ({ request }: ActionArgs) => {
    const data = JSON.parse(
        (await request.formData()).get("data") as string
    ) as NewQuizData;
    const newQuestions: Prisma.QuestionCreateNestedManyWithoutQuizInput = {
        create: data.questions.map((question) => {
            let newAnswers: Prisma.AnswerCreateNestedManyWithoutQuestionInput =
                {
                    create: question.answers.map((answer, answerIndex) => {
                        return {
                            text: answer,
                            correct: question.correctAnswer == answerIndex,
                        };
                    }),
                };
            return {
                text: question.title,
            };
        }),
    };
    const newQuiz = await prisma.quiz.create({
        data: {
            category: data.category,
            description: data.description,
            title: data.title,
            questions: newQuestions,
        },
        include: {
            questions: {
                include: {
                    answers: true,
                },
            },
        },
    });
    console.log(newQuiz);
    return redirect("/quiz/all");
};

export const loader = async () => redirect("/");
