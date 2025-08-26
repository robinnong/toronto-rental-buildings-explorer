"use client";

import { ReactElement, Suspense } from "react";
import SearchBody from "./components/SearchBody";

export default function SearchPage(props: {
  searchParams?: Promise<{
    sort?: string;
    q?: string;
  }>;
}): ReactElement {
  return (
    <div className="min-h-screen flex flex-col min-w-xs">
      <Suspense>
        <SearchBody searchParams={props.searchParams} />
      </Suspense>

      <footer className="text-center bg-gray-100 p-4">
        <p>
          ©2025&nbsp;
          <a
            className="underline font-semibold"
            href="https://github.com/robinnong"
            rel="noopener noreferrer"
            target="_blank"
          >
            Robin Nong
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
