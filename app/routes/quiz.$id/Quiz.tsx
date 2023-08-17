import type { Question, Quiz } from "@prisma/client";
import { useState } from "react";

function Question({ question, index }: { question: Question; index: number }) {
    function handleClick(index: number) {
        if (index == 0) {
        }
    }
    const unshuffled_answers = question.answers
        .split(",")
        .map((answer) => answer.trim())
        .map((answer, i) => [i, answer]);
    const answers = unshuffled_answers
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    return (
        <div className="grid grid-cols-2 gap-4">
            <p className="col-span-full tracking-[0.25em] uppercase">
                Question {index + 1}
            </p>
            <div className="col-span-full p-4 border border-primary/50 rounded">
                {question.text}
            </div>
            {answers.map((answer, i) => (
                <button className="text-left p-4 border border-secondary/50 rounded flex gap-4 items-center group hover:border-secondary transition-colors">
                    <span className="px-4 py-2 border border-secondary/50 font-black text-sm rounded group-hover:bg-secondary group-hover:text-secondary-content transition-colors">
                        {i + 1}
                    </span>
                    {answer[1]}
                </button>
            ))}
        </div>
    );
}

export default function QuizApp({
    quiz,
    questions,
}: {
    quiz: Quiz | any;
    questions: Question[];
}) {
    const [answers, setAnswers] = useState([]);
    return (
        <div className="flex flex-col gap-4 w-4/5">
            {questions.map((question, key) => (
                <Question question={question} key={key} index={key} />
            ))}
        </div>
    );
}
