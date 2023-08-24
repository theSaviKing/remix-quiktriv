import {
    redirect,
    type ActionArgs,
    type V2_MetaFunction,
} from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { useState } from "react";
import type { NewQuizData } from "~/utils/types";
import FormBody from "./formBodyHandler";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "Make a new quiz! | quikTriv quiz maker" },
        { name: "description", content: "Make easy fun quizzes with quikTriv" },
    ];
};

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    console.log(formData.get("data"));
    return redirect("/quiz/all");
}

export default function NewQuiz() {
    const [page, setPage] = useState(0);
    const [data, setData] = useState<NewQuizData>({
        title: "",
        description: "",
        category: "choose",
        questions: [],
    });
    const status = useNavigation();
    let totalPages = 3;
    return (
        <>
            <div className="flex flex-col gap-2 text-center justify-center items-center">
                <progress
                    className="progress progress-primary rounded-sm w-96 transition-none [&::-webkit-progress-value]:transition-[width] [&::-webkit-progress-value]:rounded-sm duration-500"
                    value={page + 1}
                    max={totalPages}
                ></progress>
                <p className="uppercase text-primary font-black text-sm">
                    step {page + 1} of {totalPages}
                </p>
            </div>
            <Form
                className={
                    "w-4/5 p-8 rounded border border-primary/50 flex flex-col gap-2 " +
                    (page == 1 ? "" : "2xl:w-2/5")
                }
            >
                {status.state == "idle" || status.state == "submitting" ? (
                    <FormBody
                        page={page}
                        setPage={setPage}
                        data={data}
                        setData={setData}
                    />
                ) : null}
            </Form>
        </>
    );
}

// https://blog.devgenius.io/create-a-multi-step-form-with-reactjs-322aa97a2968
