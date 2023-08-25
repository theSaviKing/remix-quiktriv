import type { NewQuizData, UseStateCallback } from "~/utils/types";
import QuizDetails from "./formComponents/QuizDetails";
import QuizPreview from "./formComponents/QuizPreview";
import QuizQuestions from "./formComponents/QuizQuestions";
import type { Navigation } from "react-router-dom";

export default function FormBody({
    page,
    setPage,
    data,
    setData,
    status,
}: {
    page: number;
    setPage: UseStateCallback<number>;
    data: NewQuizData;
    setData: UseStateCallback<NewQuizData>;
    status: Navigation;
}) {
    switch (page) {
        case 0:
            return (
                <QuizDetails setPage={setPage} data={data} setData={setData} />
            );
        case 1:
            return (
                <QuizQuestions
                    setPage={setPage}
                    data={data}
                    setData={setData}
                />
            );
        case 2:
            return (
                <QuizPreview data={data} setPage={setPage} status={status} />
            );
    }
}
