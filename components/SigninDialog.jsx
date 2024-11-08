"use client";

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInDialog() {
  // State management for modal and loading states
  const [isOpen, setIsOpen] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Handle GitHub authentication
  const handleGithubSignIn = async () => {
    setIsGithubLoading(true);
    try {
      await signIn("github");
    } finally {
      // Ensure loading state is reset even if there's an error
      setIsGithubLoading(false);
    }
  };

  // Handle Google authentication
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google");
    } finally {
      // Ensure loading state is reset even if there's an error
      setIsGoogleLoading(false);
    }
  };

  return (
    <>
      {/* Main Sign In Button */}
      <Button
        className="bg-green-600 hover:bg-green-700 text-white"
        onClick={() => setIsOpen(true)}
      >
        Sign In
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          {/* Modal Content */}
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg border border-gray-200 bg-white shadow-lg w-full max-w-[425px]">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Welcome to <span className="text-green-700">Life</span>Post
            </h2>

            {/* Sign In Buttons Container */}
            <div className="flex flex-col gap-4 w-full">
              {/* GitHub Sign In Button */}
              <Button
                className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-sm font-medium h-12"
                onClick={handleGithubSignIn}
                disabled={isGithubLoading}
              >
                {isGithubLoading ? (
                  // Loading Spinner
                  <svg
                    className="animate-spin h-5 w-5 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  // GitHub Icon and Text
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.8 9.5c.5 0 .7-.2.7-.5v-1.7C6.7 20 6.1 18 6.1 18c-.4-1.2-1-1.5-1-1.5-1-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.9 0-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7 0-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.6 4.9.3.3.6.9.6 1.6v2.2c0 .3.2.6.7.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2z"
                      />
                    </svg>
                    <span className="ml-2">GitHub</span>
                  </>
                )}
              </Button>

              {/* Google Sign In Button */}
              <Button
                variant="outline"
                className="w-full border-border hover:bg-muted hover:bg-gray-100 hover:text-foreground flex items-center justify-center text-sm font-medium h-12"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  // Loading Spinner
                  <svg
                    className="animate-spin h-5 w-5 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  // Google Icon and Text
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                    <span className="ml-2">Google</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
