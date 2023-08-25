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

type contentColorOption =
    | "primary"
    | "secondary"
    | "accent"
    | "base"
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "error";
type focusColorOption = "primary" | "secondary" | "accent" | "neutral";
type numberedColorOption = "base";
type Colors =
    | contentColorOption
    | `${focusColorOption}-focus`
    | `${contentColorOption}-content`
    | `${numberedColorOption}-${100 | 200 | 300}`;
export type FillString = `fill-${Colors}` | `fill-[${string}]`;

export interface ErrorResponse {
    status: number;
    statusText: string;
    internal: boolean;
    data: string;
    error: {};
}
