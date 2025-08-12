"use client";

import { APIProvider } from "@vis.gl/react-google-maps";

// Index page
export default function Page() {
  return (
    <APIProvider apiKey={process.env.GOOGLE_API_KEY}>
      <div className="relative h-screen w-full">
        <header className="absolute top-0 left-0 p-4 text-white">
          <h1 className="text-md text-center text-white font-extrabold font-serif">
            🏠 Toronto Rental Building Explorer
          </h1>
        </header>
        <main className="h-full w-full">
          <img
            className="w-full h-full object-cover"
            src="https://images.pexels.com/photos/1868676/pexels-photo-1868676.jpeg"
            alt="Toronto skyline"
          />
          <div className="absolute flex items-center justify-center top-0 bottom-0 right-0 left-0">
            <div className="text-white p-6 flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold font-serif mb-2">
                Toronto Rental Building Explorer
              </h1>
              <div className="text-lg">
                Explore a complete listing of over 3500 purpose-built rental
                buildings in Toronto
              </div>
              <a
                href="/search"
                className="text-lg bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-6 mt-4 rounded-full text-nowrap"
              >
                Search apartments
              </a>
            </div>
          </div>
        </main>
        <footer className="absolute bottom-0 right-0 left-0 text-center text-white p-4">
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
            . Photo by&nbsp;
            <a
              className="underline font-semibold"
              href="https://www.pexels.com/photo/high-rise-buildings-under-blue-sky-1868676/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ennvisionn
            </a>
            .
          </p>
        </footer>
      </div>
    </APIProvider>
  );
}
