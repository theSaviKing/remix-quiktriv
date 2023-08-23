export interface NewQuizData {
    title: string;
    description: string;
    category: string;
    questions: {
        id: number;
        title: string;
        answers: string[];
        correctAnswer: number;
    }[];
}

export type UseStateCallback<T> = React.Dispatch<React.SetStateAction<T>>;
