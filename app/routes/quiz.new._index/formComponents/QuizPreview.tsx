import { useSubmit } from "@remix-run/react";
import type { NewQuizData, UseStateCallback } from "~/utils/types";

export default function QuizPreview({
    data,
    setPage,
}: {
    data: NewQuizData;
    setPage: UseStateCallback<number>;
}) {
    const submit = useSubmit();
    let headerClassName = "uppercase font-black text-accent";
    let Detail = ({ title, body }: { title: string; body: string }) => (
        <div>
            <p className="uppercase text-sm font-black text-gray-500">
                {title}
            </p>
            <p>{body}</p>
        </div>
    );
    let Question = ({
        question,
        index,
    }: {
        question: NewQuizData["questions"][0];
        index: number;
    }) => (
        <div>
            <p className="font-bold">
                <span className="text-accent">{index}.</span> {question.title}
            </p>
            <div className="grid grid-cols-2 mx-auto text-sm text-gray-400">
                {question.answers.map((answer, aIndex) => (
                    <p
                        key={aIndex}
                        className={
                            question.correctAnswer == aIndex
                                ? "text-green-600 font-bold"
                                : ""
                        }
                    >
                        {answer}
                    </p>
                ))}
            </div>
        </div>
    );
    return (
        <>
            <p className="uppercase text-secondary font-bold text-xl text-center">
                Preview New Quiz
            </p>
            <div className="text-center grid grid-cols-2 p-4 gap-4">
                <div className="flex flex-col gap-4">
                    <p className={headerClassName}>Quiz Details</p>
                    <Detail title="Quiz Title" body={data.title} />
                    <Detail
                        title="Quiz Category"
                        body={
                            data.category[0].toUpperCase() +
                            data.category.slice(1)
                        }
                    />
                    <Detail title="Quiz Description" body={data.description} />
                </div>
                <div className="flex flex-col gap-6">
                    <p className={headerClassName}>Quiz Questions</p>
                    {data.questions.map((question, qIndex) => (
                        <Question
                            question={question}
                            index={qIndex + 1}
                            key={qIndex}
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
                <button
                    type="button"
                    className="btn btn-secondary btn-outline"
                    onClick={() => setPage(0)}
                >
                    Edit Quiz Details
                </button>
                <button
                    type="button"
                    className="btn btn-accent btn-outline"
                    onClick={() => setPage(1)}
                >
                    Edit Quiz Questions
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        console.log(data);
                        const formData = new FormData();
                        formData.append("data", JSON.stringify(data));
                        submit(formData, { method: "POST" });
                    }}
                >
                    Create new quiz
                </button>
            </div>
        </>
    );
}
