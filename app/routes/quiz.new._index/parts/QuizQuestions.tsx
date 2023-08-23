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
    const [slide, setSlide] = useState({
        total: 1,
        current: 0,
    });
    console.log(data.questions);

    return (
        <>
            <p className="uppercase text-secondary font-bold text-xl text-center">
                Add quiz questions
                <br />
                <span className="p-1 px-2 text-sm uppercase bg-secondary text-secondary-content rounded">
                    {data.title}
                </span>
            </p>
            <div className="m-4 border border-secondary/50 rounded p-4 flex flex-col gap-4">
                {data.questions.length == 0 ? (
                    <div className="bg-neutral text-neutral-content uppercase font-black text-center p-4 rounded">
                        No questions added
                    </div>
                ) : (
                    data.questions.map((question, questionIndex) => {
                        return (
                            <div className="flex">
                                <div className="grid grid-rows-2">
                                    <p className="rounded-tl p-2 border-2 border-neutral flex justify-center items-center">
                                        {questionIndex + 1}
                                    </p>
                                    <button
                                        type="button"
                                        className="rounded-bl p-2 border-2 border-t-0 border-neutral bg-error/25 text-error flex justify-center items-center transition-colors"
                                        onClick={() => {
                                            setData({
                                                ...data,
                                                questions:
                                                    data.questions.filter(
                                                        (q) =>
                                                            q.id != question.id
                                                    ),
                                            });
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex w-full">
                                    <input
                                        type="text"
                                        className="bg-neutral p-4 border-2 border-neutral focus:outline-none focus:border-accent text-xl font-bold flex justify-center items-center"
                                        value={question.title}
                                        onChange={(e) =>
                                            setData((data) => {
                                                return {
                                                    ...data,
                                                    questions:
                                                        data.questions.splice(
                                                            questionIndex,
                                                            1,
                                                            {
                                                                ...data
                                                                    .questions[
                                                                    questionIndex
                                                                ],
                                                                title: e.target
                                                                    .value,
                                                            }
                                                        ),
                                                };
                                            })
                                        }
                                    />
                                    <div className="border-2 border-neutral rounded-r p-2 grid grid-cols-2 gap-2 grow">
                                        {question.answers.map(
                                            (answer, answerIndex) => (
                                                <div className="flex gap-1">
                                                    <input
                                                        type="text"
                                                        className="rounded-l p-2 bg-neutral grow focus:outline-none border-2 border-neutral focus:border-secondary"
                                                        value={answer}
                                                        onChange={(e) =>
                                                            setData((data) => {
                                                                const updatedQuestions =
                                                                    [
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
                                                                            (
                                                                                answer,
                                                                                idx
                                                                            ) =>
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
                                                            data.questions[
                                                                questionIndex
                                                            ].correctAnswer ==
                                                            answerIndex
                                                        }
                                                        onChange={(e) =>
                                                            setData((data) => {
                                                                const updatedQuestions =
                                                                    [
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
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
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
                        setSlide((slide) => {
                            return {
                                ...slide,
                                total: Math.ceil(data.questions.length + 1 / 2),
                            };
                        });
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
