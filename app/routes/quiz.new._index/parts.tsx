import QuizQuestions from "./parts/QuizQuestions";
import QuizDetails from "./parts/QuizDetails";
import { NewQuizData, UseStateCallback } from "~/utils/types";

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
    }
}
