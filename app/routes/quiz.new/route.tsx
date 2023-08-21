import { ActionArgs, V2_MetaFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { prisma } from "~/utils/db.server";
import { Details, Questions } from "./parts";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "Make a new quiz! | quikTriv quiz maker" },
        { name: "description", content: "Make easy fun quizzes with quikTriv" },
    ];
};

export async function action({ request }: ActionArgs) {
    const data = await request.formData();
    return redirect("/quiz/all");
}

export default function NewQuiz() {
    const [page, setPage] = useState(0);
    let FormBody;
    switch (page) {
        case 0:
            FormBody = <Details />;
            break;
        case 1:
            FormBody = <Questions />;
        default:
            FormBody = <Details />;
    }
    return (
        <>
            <div className="text-center space-y-4">
                <h1>New Quiz</h1>
                <p className="uppercase font-bold">
                    create a new quiz that you can share with friends!
                </p>
            </div>
            <Form method="post" className="w-3/5 relative">
                <FormBody />
            </Form>
        </>
    );
}

// https://blog.devgenius.io/create-a-multi-step-form-with-reactjs-322aa97a2968
