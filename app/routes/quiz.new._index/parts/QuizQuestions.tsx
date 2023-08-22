import { useState } from "react";
import { NewQuizData } from "../route";

export default function QuizQuestions({
    setPage,
    data,
    setData,
}: {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    data: NewQuizData;
    setData: React.Dispatch<React.SetStateAction<NewQuizData>>;
}) {
    const [counter, setCounter] = useState(1);
    console.log(data.questions);
    return (
        <>
            <p className="uppercase text-secondary font-bold text-xl text-center">
                Add quiz questions
            </p>
            <div className="m-4 border border-secondary/50 rounded p-4 flex flex-col gap-4">
                {data.questions.length == 0 ? (
                    <div className="bg-neutral text-neutral-content uppercase font-black text-center p-4 rounded">
                        No questions added
                    </div>
                ) : (
                    data.questions.map((question, questionIndex) => (
                        <div className="grid grid-cols-2">
                            <input
                                type="text"
                                className="bg-neutral rounded-l p-4 border-2 border-neutral focus:outline-none focus:border-accent text-xl font-bold flex justify-center items-center"
                                value={question.title}
                                onChange={(e) =>
                                    setData((data) => {
                                        return {
                                            ...data,
                                            questions: data.questions.splice(
                                                questionIndex,
                                                1,
                                                {
                                                    ...data.questions[
                                                        questionIndex
                                                    ],
                                                    title: e.target.value,
                                                }
                                            ),
                                        };
                                    })
                                }
                            />
                            <div className="border-2 border-neutral rounded-r p-2 grid grid-cols-2 gap-2">
                                {question.answers.map((answer, answerIndex) => (
                                    <div className="flex gap-1">
                                        <input
                                            type="text"
                                            className="rounded-l p-2 bg-neutral grow focus:outline-none border-2 border-neutral focus:border-secondary"
                                            value={
                                                data.questions[questionIndex]
                                                    .answers[answerIndex]
                                            }
                                            onChange={(e) =>
                                                setData((data) => {
                                                    const updatedQuestions = [
                                                        ...data.questions,
                                                    ];
                                                    updatedQuestions[
                                                        questionIndex
                                                    ] = {
                                                        ...updatedQuestions[
                                                            questionIndex
                                                        ],
                                                        answers:
                                                            updatedQuestions[
                                                                questionIndex
                                                            ].answers.map(
                                                                (answer, idx) =>
                                                                    idx ===
                                                                    answerIndex
                                                                        ? e
                                                                              .target
                                                                              .value
                                                                        : answer
                                                            ),
                                                    };

                                                    return {
                                                        ...data,
                                                        questions:
                                                            updatedQuestions,
                                                    };
                                                })
                                            }
                                        />
                                        <input
                                            type="radio"
                                            className="checkbox checkbox-lg checkbox-secondary h-full rounded-r rounded-l-none bg-neutral border-0"
                                            name={`radio-${question.id}`}
                                            checked={
                                                data.questions[questionIndex]
                                                    .correctAnswer ==
                                                answerIndex
                                            }
                                            onChange={(e) =>
                                                setData((data) => {
                                                    const updatedQuestions = [
                                                        ...data.questions,
                                                    ];
                                                    updatedQuestions[
                                                        questionIndex
                                                    ] = {
                                                        ...updatedQuestions[
                                                            questionIndex
                                                        ],
                                                        correctAnswer:
                                                            answerIndex,
                                                    };

                                                    return {
                                                        ...data,
                                                        questions:
                                                            updatedQuestions,
                                                    };
                                                })
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
                <button
                    className="btn btn-secondary btn-circle btn-lg text-4xl mx-auto"
                    onClick={() => {
                        setData((data) => {
                            return {
                                ...data,
                                questions: [
                                    ...data.questions,
                                    {
                                        id: counter,
                                        title: `Question ${counter}`,
                                        answers: [
                                            "Answer 1",
                                            "Answer 2",
                                            "Answer 3",
                                            "Answer 4",
                                        ],
                                        correctAnswer: 0,
                                    },
                                ],
                            };
                        });
                        setCounter((counter) => counter + 1);
                    }}
                >
                    +
                </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 w-max self-end">
                <button
                    type="button"
                    className="btn btn-secondary btn-outline"
                    onClick={() => setPage((page) => page - 1)}
                >
                    Back to Quiz Details
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => console.log(data)}
                >
                    Create new quiz
                </button>
            </div>
        </>
    );
}
