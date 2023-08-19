import type { V2_MetaFunction } from "@remix-run/node";
import HR from "~/components/HR";

export const meta: V2_MetaFunction = () => {
    return [
        { title: "quikTriv: the easy quiz maker app" },
        { name: "description", content: "Make easy fun quizzes with quikTriv" },
    ];
};

export default function Index() {
    return (
        <div>
            <h1 className="text-6xl flex flex-col text-center normal-case font-sans">
                <span className="uppercase font-black text-2xl tracking-widest">
                    Welcome to
                </span>
                <span className="text-6xl font-extralight">quikTriv</span>
            </h1>
            <HR />
            <div className="w-4/5 max-w-xl mx-auto text-center">
                <b>quikTriv</b> is a lightweight quiz maker app that allows you
                to create an easily playable quiz that you can share with
                friends. Try quikTriv now! Click{" "}
                <a
                    href="#new-quiz"
                    className="btn no-animation btn-xs btn-primary"
                >
                    New Quiz
                </a>{" "}
                in the top-right corner.
            </div>
        </div>
    );
}
