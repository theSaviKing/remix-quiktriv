import type { V2_MetaFunction } from "@remix-run/node";

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
        </div>
    );
}
