import QuizQuestions from "./formComponents/QuizQuestions";
import QuizDetails from "./formComponents/QuizDetails";
import { NewQuizData, UseStateCallback } from "~/utils/types";
import QuizPreview from "./formComponents/QuizPreview";

export default function FormBody({
    page,
    setPage,
    data,
    setData,
}: {
    page: number;
    setPage: UseStateCallback<number>;
    data: NewQuizData;
    setData: UseStateCallback<NewQuizData>;
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
            return <QuizPreview data={data} setPage={setPage} />;
    }
}
