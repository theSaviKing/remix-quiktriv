import { ActionArgs, V2_MetaFunction, redirect } from "@remix-run/node";
import { Form, Outlet } from "@remix-run/react";
import { useState, PropsWithChildren } from "react";
import { prisma } from "~/utils/db.server";
import FormBody from "./parts";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "Make a new quiz! | quikTriv quiz maker" },
        { name: "description", content: "Make easy fun quizzes with quikTriv" },
    ];
};

export default function NewQuiz(props: PropsWithChildren) {
    const [page, setPage] = useState(0);
    const [data, setData] = useState<{
        title: string;
        description: string;
        category: string;
        questions: { id: number; title: string; answers: string[] }[];
    }>({
        title: "",
        description: "",
        category: "choose",
        questions: [],
    });
    const [status, setStatus] = useState<
        "typing" | "submitting" | "created" | "error"
    >("typing");
    return (
        <>
            <Form
                className={
                    "w-4/5 p-8 rounded border border-primary/50 flex flex-col gap-2 " +
                    (page == 1 ? "xl:w-3/5" : "xl:w-2/5")
                }
            >
                <FormBody
                    page={page}
                    setPage={setPage}
                    data={data}
                    setData={setData}
                />
            </Form>
        </>
    );
}

// https://blog.devgenius.io/create-a-multi-step-form-with-reactjs-322aa97a2968