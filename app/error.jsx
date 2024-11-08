"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Error</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-8">
          {error?.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Try again
        </button>
        <p className="text-gray-600 mb-5">OR</p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
