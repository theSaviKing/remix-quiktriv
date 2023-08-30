import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useSearchParams } from "react-router-dom";

export default function () {
    const params = useSearchParams()[0];
    let quizId = params.get("id"),
        quizTitle = params.get("title");
    if (!quizId || !quizTitle) {
        return redirect("/quiz/all");
    }
    return (
        <div className="p-8 bg-success rounded text-success-content">
            <span className="font-bold">Success!</span> Your quiz was
            successfully created. Access your quiz here:{" "}
            <Link to={`/quiz/${quizId}`} className="btn btn-sm">
                {quizTitle}
            </Link>
        </div>
    );
}
