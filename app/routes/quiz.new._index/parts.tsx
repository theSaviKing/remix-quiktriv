import QuizQuestions from "./parts/QuizQuestions";
import QuizDetails from "./parts/QuizDetails";

export default function FormBody({
    page,
    setPage,
    data,
    setData,
}: {
    page: number;
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
