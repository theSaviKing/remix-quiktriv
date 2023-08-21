function Details({
    setPage,
    data,
    setData,
}: {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    data: {
        title: string;
        description: string;
        category: string;
        questions: never[];
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            title: string;
            description: string;
            category: string;
            questions: never[];
        }>
    >;
}) {
    return (
        <>
            <p className="uppercase text-secondary font-bold text-xl text-center">
                Enter quiz details
            </p>
            <label htmlFor="title" className="label">
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
            <label htmlFor="description" className="label">
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
            <label htmlFor="category" className="label">
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

function Questions({
    setPage,
    data,
    setData,
}: {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    data: {
        title: string;
        description: string;
        category: string;
        questions: never[];
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            title: string;
            description: string;
            category: string;
            questions: never[];
        }>
    >;
}) {
    return (
        <>
            <p className="uppercase text-secondary font-bold text-xl text-center">
                Add quiz questions
            </p>
            <div className="grid grid-cols-2 gap-2 mt-4 w-max self-end">
                <button
                    type="button"
                    className="btn btn-secondary btn-outline"
                    onClick={() => setPage((page) => page - 1)}
                >
                    Back to Quiz Details
                </button>
                <button type="submit" className="btn btn-primary">
                    Create new quiz
                </button>
            </div>
        </>
    );
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default function FormBody({
    page,
    setPage,
    data,
    setData,
}: {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    data: {
        title: string;
        description: string;
        category: string;
        questions: never[];
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            title: string;
            description: string;
            category: string;
            questions: never[];
        }>
    >;
}) {
    switch (page) {
        case 0:
            return <Details setPage={setPage} data={data} setData={setData} />;
        case 1:
            return (
                <Questions setPage={setPage} data={data} setData={setData} />
            );
    }
}
