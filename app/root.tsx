import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "@remix-run/react";
import Logo from "~/components/Logo";
import fonts from "~/css/fonts.css";
import tailwindStyles from "~/css/tailwind.css";
import ErrorGraphic from "~/components/ErrorGraphic";
import ErrorBlob from "./components/ErrorBlob";
import type { ErrorResponse } from "./utils/types";

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: fonts },
];

export function ErrorBoundary() {
    const error = useRouteError() as ErrorResponse;
    if (!error.status && !error.statusText) {
        error.status = 500;
        error.statusText = "Internal Server Error.";
    }
    return (
        <html>
            <head>
                <title>We've got a {error.status} on our hands...</title>
                <Meta />
                <Links />
            </head>
            <body className="flex flex-col justify-center items-center w-full h-screen overflow-hidden">
                <header className="flex flex-col xl:flex-row-reverse gap-24 xl:gap-8 w-full xl:h-full items-center">
                    <div className="w-1/2 justify-self-end relative h-full flex items-center scale-50 xl:scale-100 -mt-72 xl:mt-0">
                        <ErrorBlob className="absolute w-[80rem] -top-96 -right-96 -z-10 fill-primary-focus/20" />
                        <ErrorGraphic
                            octoLight="fill-primary"
                            octoDark="fill-primary-focus"
                            manGearLight="fill-secondary"
                            manGearDark="fill-secondary-focus"
                            manGloves="fill-accent-focus"
                            manShoes="fill-accent"
                            manBody="fill-base-content"
                            light="fill-base-content"
                            className="w-[50rem] mr-16"
                        />
                    </div>
                    <div className="w-1/2 space-y-8 text-center ml-16 z-20">
                        {error.status && (
                            <h1 className="text-9xl font-bold">
                                {error.status}
                            </h1>
                        )}
                        {error.statusText && (
                            <p className="font-light text-5xl">
                                {error.statusText}
                            </p>
                        )}
                        {error.data && (
                            <p className="p-2 px-4 rounded-lg bg-base-200 font-mono">
                                {error.data}
                            </p>
                        )}
                        <div className="mt-8 space-y-4">
                            <p className="uppercase text-secondary font-bold">
                                nav links
                            </p>
                            <div className="grid grid-cols-3 gap-2 w-3/5 mx-auto">
                                <Link
                                    to="/"
                                    className="btn btn-primary btn-outline"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/quiz/all"
                                    className="btn btn-secondary btn-outline"
                                >
                                    All Quizzes
                                </Link>
                                <Link
                                    to="/quiz/new"
                                    className="btn btn-accent btn-outline"
                                >
                                    Make a new quiz
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="flex flex-col flex-wrap h-screen">
                <header className="navbar h-24 p-4 px-8 shadow-xl fixed top-0 z-50 bg-base-100">
                    <div className="navbar-start text-4xl">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    <div className="navbar-center">
                        <Link to="quiz/all" className="btn btn-ghost">
                            All Quizzes{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" />
                            </svg>
                        </Link>
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost mb-1">
                                Categories{" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.493 2.853a.75.75 0 00-1.486-.205L7.545 6H4.198a.75.75 0 000 1.5h3.14l-.69 5H3.302a.75.75 0 000 1.5h3.14l-.435 3.148a.75.75 0 001.486.205L7.955 14h2.986l-.434 3.148a.75.75 0 001.486.205L12.456 14h3.346a.75.75 0 000-1.5h-3.14l.69-5h3.346a.75.75 0 000-1.5h-3.14l.435-3.147a.75.75 0 00-1.486-.205L12.045 6H9.059l.434-3.147zM8.852 7.5l-.69 5h2.986l.69-5H8.852z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content z-[1] p-2 bg-neutral shadow rounded-box w-48"
                            >
                                <li>
                                    <button>Sports</button>
                                </li>
                                <li>
                                    <button>Music</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-end flex gap-2">
                        <Link
                            className="btn btn-primary target:animate-pulse duration-1000"
                            id="new-quiz"
                            to="/quiz/new"
                        >
                            New Quiz{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                            </svg>
                        </Link>
                    </div>
                </header>
                <div className="grow flex mt-24">
                    <div id="sidebar" className="h-full p-8 hidden"></div>
                    {/* div#sidebar to be implemented */}
                    <main className="flex flex-col justify-center items-center w-full h-full p-8 gap-8">
                        <Outlet />
                    </main>
                </div>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
