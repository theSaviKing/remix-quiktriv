import { useState } from "react";

export default function QuizQuestions({
    setPage,
    data,
    setData,
}: {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    data: {
        title: string;
        description: string;
        category: string;
        questions: { id: number; title: string; answers: string[] }[];
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            title: string;
            description: string;
            category: string;
            questions: { id: number; title: string; answers: string[] }[];
        }>
    >;
}) {
    let qCounter = 0;
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
                    data.questions.map((question) => (
                        <NewQuestion question={question} />
                    ))
                )}
                <button
                    className="btn btn-secondary btn-circle btn-lg text-4xl mx-auto"
                    onClick={() => {
                        let id = qCounter++;
                        setData((data) => {
                            return {
                                ...data,
                                questions: [
                                    ...data.questions,
                                    {
                                        id: id,
                                        title: `Question ${id}`,
                                        answers: [
                                            "Answer 1",
                                            "Answer 2",
                                            "Answer 3",
                                        ],
                                    },
                                ],
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

export function NewQuestion({
    question,
}: {
    question: { id: number; title: string; answers: string[] };
}) {
    return <div></div>;
}
