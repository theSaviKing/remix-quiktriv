import QuizQuestions from "./parts/QuizQuestions";
import QuizDetails from "./parts/QuizDetails";
import { NewQuizData } from "./route";

export default function FormBody({
    page,
    setPage,
    data,
    setData,
}: {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    data: NewQuizData;
    setData: React.Dispatch<React.SetStateAction<NewQuizData>>;
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
