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
        <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-6xl flex flex-col text-center">
                <span className="uppercase font-black text-2xl tracking-widest">
                    Welcome to
                </span>
                <span className="text-6xl font-extralight">quikTriv</span>
            </h1>
            <HR />
            <div>
                <b>quikTriv</b> is a lightweight quiz maker app that allows you
                to create an easily playable quiz that you can share with
                friends. Try quikTriv now! Click {"{ Make a new quiz }"} in the
                top-right corner.
            </div>
        </div>
    );
}
