import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

/**
 * Create Startup Page Component
 * This page allows authenticated users to submit their startup posts
 * @returns {JSX.Element} The rendered page component
 */
export default async function CreateStartupPage() {
  // Fetch the current authentication session
  const session = await auth();

  // Redirect unauthorized users to home page
  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      {/* Hero section with title */}
      <section className="green_container !min-h-[230px]">
        <h1 className="heading">Submit Your Post</h1>
        <p className="text-center mt-2 text-white">
          Share your startup journey with our community
        </p>
      </section>
      {/* Startup submission form component */}
      <StartupForm userId={session.user.id} />{" "}
      {/* Pass user ID to form component */}
    </>
  );
}
