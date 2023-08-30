import { Link } from "@remix-run/react";

export default function () {
    return (
        <div className="p-8 bg-error rounded text-error-content">
            Oops! Your quiz couldn't be created. Try again:{" "}
            <Link to="/quiz/new" className="btn btn-sm">
                New Quiz
            </Link>
        </div>
    );
}
