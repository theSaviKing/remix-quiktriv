import { useState } from "react";
import type { NewQuizData, UseStateCallback } from "~/utils/types";

export default function QuizQuestions({
    setPage,
    data,
    setData,
}: {
    setPage: UseStateCallback<number>;
    data: NewQuizData;
    setData: UseStateCallback<NewQuizData>;
}) {
    const [counter, setCounter] = useState(1);
    const [slide, setSlide] = useState(0);
    // console.log(data.questions);

    const questionsPerSlide = 2;
    const lastSlideIndex =
        Math.ceil(data.questions.length / questionsPerSlide) - 1;

    let currentSlideQuestions = ((
        currentSlideIndex: number,
        questionsPerSlide: number,
        questions: NewQuizData["questions"]
    ): typeof questions => {
        const startIndex = currentSlideIndex * questionsPerSlide;
        const endIndex = startIndex + questionsPerSlide;

        return questions.filter((_, index) => {
            return index >= startIndex && index < endIndex;
        });
    })(slide, questionsPerSlide, data.questions);

    let slideBtnClassName = "btn btn-secondary btn-circle transition-colors";

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
                    <div className="flex gap-4 items-center">
                        <button
                            type="button"
                            className={slideBtnClassName}
                            disabled={slide == 0}
                            onClick={() => setSlide((slide) => slide - 1)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={4}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                />
                            </svg>
                        </button>
                        <div className="flex flex-col gap-4 w-full">
                            {currentSlideQuestions.map(
                                (question, questionIndex) => {
                                    let qIndex =
                                        questionIndex +
                                        slide * questionsPerSlide;
                                    return (
                                        <div className="flex" key={question.id}>
                                            <div className="grid grid-rows-2">
                                                <p className="rounded-tl p-2 border-2 border-neutral flex justify-center items-center">
                                                    {qIndex + 1}
                                                </p>
                                                <button
                                                    type="button"
                                                    className="rounded-bl p-2 border-2 border-t-0 border-neutral bg-error/25 text-error flex justify-center items-center transition-colors hover:bg-error hover:text-error-content"
                                                    onClick={() => {
                                                        const newData = {
                                                            ...data,
                                                            questions:
                                                                data.questions.filter(
                                                                    (q) =>
                                                                        q.id !=
                                                                        question.id
                                                                ),
                                                        };
                                                        setData(newData);
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
                                                <textarea
                                                    className="bg-neutral p-4 border-2 border-neutral focus:outline-none focus:border-accent text-xl font-bold flex justify-center items-center resize-none scrollbar-thin scrollbar-thumb-accent-focus/50"
                                                    value={question.title}
                                                    onChange={(e) => {
                                                        const newQuestions = [
                                                            ...data.questions,
                                                        ];
                                                        newQuestions[qIndex] = {
                                                            ...newQuestions[
                                                                qIndex
                                                            ],
                                                            title: e.target
                                                                .value,
                                                        };

                                                        setData((prevData) => ({
                                                            ...prevData,
                                                            questions:
                                                                newQuestions,
                                                        }));
                                                    }}
                                                />
                                                <div className="border-2 border-neutral rounded-r p-2 grid grid-cols-2 gap-2 grow">
                                                    {question.answers.map(
                                                        (answer, aIndex) => (
                                                            <div
                                                                className="flex gap-1"
                                                                key={aIndex}
                                                            >
                                                                <input
                                                                    type="text"
                                                                    className="rounded-l p-2 bg-neutral grow focus:outline-none border-2 border-neutral focus:border-secondary"
                                                                    value={
                                                                        answer
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            (
                                                                                data
                                                                            ) => {
                                                                                const updatedQuestions =
                                                                                    [
                                                                                        ...data.questions,
                                                                                    ];
                                                                                updatedQuestions[
                                                                                    qIndex
                                                                                ] =
                                                                                    {
                                                                                        ...updatedQuestions[
                                                                                            qIndex
                                                                                        ],
                                                                                        answers:
                                                                                            updatedQuestions[
                                                                                                qIndex
                                                                                            ].answers.map(
                                                                                                (
                                                                                                    answer,
                                                                                                    idx
                                                                                                ) =>
                                                                                                    idx ===
                                                                                                    aIndex
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
                                                                            }
                                                                        )
                                                                    }
                                                                />
                                                                <input
                                                                    type="radio"
                                                                    className="checkbox checkbox-lg checkbox-secondary h-full rounded-r rounded-l-none bg-neutral border-0"
                                                                    name={`radio-${question.id}`}
                                                                    checked={
                                                                        data
                                                                            .questions[
                                                                            qIndex
                                                                        ]
                                                                            .correctAnswer ==
                                                                        aIndex
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            (
                                                                                data
                                                                            ) => {
                                                                                const updatedQuestions =
                                                                                    [
                                                                                        ...data.questions,
                                                                                    ];
                                                                                updatedQuestions[
                                                                                    qIndex
                                                                                ] =
                                                                                    {
                                                                                        ...updatedQuestions[
                                                                                            qIndex
                                                                                        ],
                                                                                        correctAnswer:
                                                                                            aIndex,
                                                                                    };

                                                                                return {
                                                                                    ...data,
                                                                                    questions:
                                                                                        updatedQuestions,
                                                                                };
                                                                            }
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        <button
                            type="button"
                            className={slideBtnClassName}
                            disabled={slide >= lastSlideIndex}
                            onClick={() => setSlide((slide) => slide + 1)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={4}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </button>
                    </div>
                )}
                <button
                    className="btn btn-secondary btn-circle btn-lg text-4xl mx-auto"
                    onClick={() => {
                        setData((data) => ({
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
                        }));
                        setCounter((counter) => counter + 1);
                    }}
                >
                    +
                </button>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    className="btn btn-secondary btn-outline"
                    onClick={() => setPage((page) => page - 1)}
                >
                    Back to Quiz Details
                </button>
                <button
                    type="button"
                    className={`btn btn-primary disabled:pointer-events-auto disabled:no-animation ${
                        data.questions.length == 0
                            ? "tooltip tooltip-secondary before:normal-case"
                            : ""
                    }`}
                    data-tip={
                        data.questions.length == 0
                            ? "You need to have at least one question created."
                            : ""
                    }
                    onClick={() => setPage((page) => page + 1)}
                    disabled={data.questions.length == 0}
                >
                    Preview new quiz
                </button>
            </div>
        </>
    );
}
