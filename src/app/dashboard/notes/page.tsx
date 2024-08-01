"use client";

import useNotes from "@/lib/context/NotesContext";
import { useEffect, useState } from "react";
import { Value } from "./types";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import defaultData, { exportContentAsText, extractTitle } from "@/lib/note";

function Page({}) {
  const { kv, deleteNote } = useNotes();

  useEffect(() => {
    if (
      !localStorage.getItem("archived-1000000001") &&
      !localStorage.getItem("1000000001")
    ) {
      localStorage.setItem("1000000001", JSON.stringify(defaultData));
    }
  }, []);

  return (
    <div className="">
      {kv && (
        <div className="mt-8 md:px-12">
          <h2 className="text-2xl font-bold">Your Notes</h2>

          <Link
            href={`/dashboard/notes/new`}
            className="border bottom-5 flex max-h-fit gap-2 rounded-lg bg-white p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto sm:top-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>{" "}
            New note
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-y-8 gap-4 mt-4">
            {kv.map(([key, value]: [string, Value]) => (
              <Link
                key={key}
                href={`/dashboard/notes/${key}`}
                className="rounded-md p-2 group  col-span-1"
              >
                <Card className="group-hover:scale-105 duration-150 ease-out">
                  <CardHeader className="rounded-t-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-stone-100 group-active:bg-stone-200 py-2">
                    <CardTitle className="text-sm font-semibold">
                      {key.length === 10 && key.match(/^\d+$/)
                        ? value
                          ? extractTitle(value)
                          : "untitled"
                        : null}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative overflow-hidden h-40">
                    <p className="text-sm mt-4">{exportContentAsText(value)}</p>
                    <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white dark:from-gray-900" />

                    <div className="absolute bottom-4 right-4 z-10">
                      <button
                        className="flex h-10 w-10 items-center justify-center rounded-md p-2 bg-white hover:bg-stone-100 active:bg-stone-200"
                        onClick={async (e) => {
                          e.preventDefault();
                          await deleteNote(key);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
