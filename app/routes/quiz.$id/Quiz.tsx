import type { Answer, Prisma, Question, Quiz } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";

function Question({
    question,
    index,
    setPoints,
}: {
    question: Prisma.QuestionGetPayload<{ include: { answers: true } }>;
    index: number;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
}) {
    const [answer, setAnswer] = useState(-1);
    let cAnswer = question.answers.find((answer) => answer.correct);
    let correctAnswer: number;
    if (cAnswer != undefined) {
        correctAnswer = cAnswer.id;
    }
    function handleClick(index: number) {
        setAnswer(index);
        if (index == correctAnswer) {
            setPoints((pts) => pts + 1);
        }
    }
    let disabled = answer > -1;
    return (
        <div className="grid grid-cols-2 gap-4">
            <p className="col-span-full tracking-[0.25em] uppercase">
                Question {index + 1}
            </p>
            <div className="col-span-full p-4 border border-primary/50 rounded text-lg">
                {question.text}
            </div>
            {question.answers.map((ans, i) => {
                let selected = ans.id == answer;
                return (
                    <button
                        className={[
                            "text-left p-4 border border-secondary/50 rounded flex gap-4 items-center group hover:[&:not([disabled])]:border-secondary transition-all relative overflow-hidden",
                            disabled
                                ? ans.correct
                                    ? "bg-green-950 border-green-700 correct"
                                    : "bg-red-950 border-red-700 incorrect"
                                : "",
                            selected ? "selected " : "",
                        ].join(" ")}
                        onClick={() => handleClick(ans.id)}
                        disabled={disabled}
                    >
                        <span className="px-4 py-2 border border-secondary/50 font-black text-sm rounded group-hover:group-[:not([disabled])]:bg-secondary group-hover:group-[:not([disabled])]:text-secondary-content transition-colors group-[.correct]:border-green-700 group-[.incorrect]:border-red-700 group-[.selected]:group-[.correct]:bg-green-800 group-[.selected]:group-[.incorrect]:bg-red-800 text-base-content">
                            {i + 1}
                        </span>
                        {ans.text}
                        <span
                            className={[
                                "absolute top-0 right-0 rounded-r h-full font-mono p-4 flex justify-center items-center font-black transition-all",
                                selected ? "mr-0" : "-mr-20",
                                ans.correct
                                    ? "bg-green-800 text-green-300"
                                    : "bg-red-800 text-red-300",
                            ].join(" ")}
                        >
                            {ans.correct ? "+1" : "+0"}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

export default function QuizApp({
    quiz,
}: {
    quiz: Prisma.QuizGetPayload<{
        include: { questions: { include: { answers: true } } };
    }>;
}) {
    const [points, setPoints] = useState(0);
    const ptsStyle = { "--value": points } as React.CSSProperties;
    return (
        <div className="flex flex-col gap-4 w-4/5">
            {quiz.questions.map((question, key) => {
                return (
                    <Question
                        question={question}
                        key={key}
                        index={key}
                        setPoints={setPoints}
                    />
                );
            })}
            <p className="fixed bottom-6 left-6 uppercase p-4 rounded border border-accent/50 mx-auto">
                Total Points:{" "}
                <span className="countdown font-mono p-1 bg-neutral rounded font-medium">
                    <span style={ptsStyle}></span>
                </span>
            </p>
        </div>
    );
}
