import { ActionArgs, V2_MetaFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { prisma } from "~/utils/db.server";
import FormBody from "./parts";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "Make a new quiz! | quikTriv quiz maker" },
        { name: "description", content: "Make easy fun quizzes with quikTriv" },
    ];
};

function getFormData(data: {}) {
    console.log(data);
    return redirect("/quiz/all");
}

export default function NewQuiz() {
    const [page, setPage] = useState(0);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "choose",
        questions: [],
    });
    return (
        <>
            <div className="text-center">
                <h1>New Quiz</h1>
                <p className="text-lg mt-6 mx-auto p-4 rounded border border-neutral">
                    Create a new quiz that you can share with friends!
                </p>
            </div>
            <Form className="w-2/5 p-8 rounded border border-primary/50 flex flex-col gap-2">
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
