import { useState } from "react";
import { NewQuizData, UseStateCallback } from "~/utils/types";

export default function QuizDetails({
    setPage,
    data,
    setData,
}: {
    setPage: UseStateCallback<number>;
    data: NewQuizData;
    setData: UseStateCallback<NewQuizData>;
}) {
    return (
        <>
            <p className="uppercase text-secondary font-bold text-xl text-center">
                Enter quiz details
            </p>
            <label htmlFor="title" className="label relative">
                Title
            </label>
            <input
                type="text"
                className="input input-bordered"
                name="title"
                placeholder="The coolest quiz you'll ever take"
                required
                onChange={(e) =>
                    setData((data) => {
                        return { ...data, title: e.target.value };
                    })
                }
                value={data.title}
            />
            <label htmlFor="description" className="label relative">
                Description
            </label>
            <textarea
                name="description"
                cols={30}
                rows={3}
                className="textarea textarea-bordered leading-snug"
                required
                placeholder="Take this quiz! It's really cool!"
                onChange={(e) =>
                    setData((data) => {
                        return { ...data, description: e.target.value };
                    })
                }
                value={data.description}
            ></textarea>
            <label htmlFor="category" className="label relative">
                Category
            </label>
            <select
                name="category"
                className="select select-bordered"
                required
                onChange={(e) =>
                    setData((data) => {
                        return { ...data, category: e.target.value };
                    })
                }
                value={data.category}
            >
                <option disabled value="choose">
                    Choose a category...
                </option>
                <option value="sports">Sports</option>
                <option value="music">Music</option>
            </select>
            <button
                type="button"
                className="btn btn-primary mt-4 self-end w-max"
                onClick={() => setPage((page) => page + 1)}
            >
                Add Quiz Questions
            </button>
        </>
    );
}
