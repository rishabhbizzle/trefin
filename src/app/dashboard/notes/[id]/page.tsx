"use client";

import { notFound } from "next/navigation";
import NovelEditor from "../components/NovelEditor";

function Page( { params }: { params: { id: string } }) {
    const id = params.id
    return (
        <div className="mb-12 flex min-h-[100svh] flex-col items-center sm:px-5 sm:pt-[calc(20vh)] md:mb-0">
            <NovelEditor id={id} />
        </div>
    );
}

export default Page;