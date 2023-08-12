import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import tailwindStyles from "~/css/tailwind.css";
import fonts from "~/css/fonts.css";
import Logo from "~/components/Logo";

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: fonts },
];

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
                <header className="navbar h-24 p-4 px-8 shadow-xl">
                    <h1 className="navbar-start text-4xl">
                        <Logo />
                    </h1>
                    <nav className="navbar-end flex gap-2">
                        <button className="btn btn-primary">New Quiz</button>
                    </nav>
                </header>
                <main className="grow flex">
                    <div id="sidebar" className="h-full p-8 hidden"></div>
                    {/* div#sidebar to be implemented */}
                    <div className="flex flex-col justify-center items-center w-full h-full p-8">
                        <Outlet />
                    </div>
                </main>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
