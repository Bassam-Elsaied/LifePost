export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="relative">
        {/* Rocket */}
        <div className="animate-bounce duration-1000">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500 transform rotate-45"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>

            {/* Animated flame */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 rotate-45">
              <div className="animate-pulse">
                <div className="h-8 w-4 bg-orange-500 rounded-full blur-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Stars */}
        <div className="absolute top-0 left-0 w-full h-full animate-pulse">
          <div className="absolute top-1/4 left-1/4 h-2 w-2 bg-yellow-300 rounded-full" />
          <div className="absolute top-3/4 left-1/2 h-2 w-2 bg-yellow-300 rounded-full" />
          <div className="absolute top-1/2 right-1/4 h-2 w-2 bg-yellow-300 rounded-full" />
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-8 text-xl font-bold text-gray-700">
        <span className="inline-block animate-bounce">L</span>
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0.1s" }}
        >
          o
        </span>
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0.2s" }}
        >
          a
        </span>
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0.3s" }}
        >
          d
        </span>
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0.4s" }}
        >
          i
        </span>
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          n
        </span>
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0.6s" }}
        >
          g
        </span>
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0.9s" }}
        ></span>
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          🚀
        </span>
      </div>
    </div>
  );
}
