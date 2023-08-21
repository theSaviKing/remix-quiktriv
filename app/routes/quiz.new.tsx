import { Outlet } from "@remix-run/react";

export default function NewQuizWrapper() {
    return (
        <>
            <div className="text-center">
                <h1>New Quiz</h1>
                <p className="text-lg mt-6 mx-auto p-4 rounded border border-neutral">
                    Create a new quiz that you can share with friends!
                </p>
            </div>
            <Outlet />
        </>
    );
}
