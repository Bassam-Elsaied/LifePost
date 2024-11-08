import { auth } from "@/auth";
import { PostCardSkeleton } from "@/components/PostCard";
import ProfileImage from "@/components/ProfileImage";
import UserStartups from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY_PROFILE } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Suspense } from "react";

/**
 * User Profile Page Component
 * Displays user information and their startups
 * @param {Object} params - Route parameters containing user ID
 */
export default async function UserProfilePage({ params }) {
  // Get current user session
  const session = await auth();

  // Fetch user data from Sanity
  const user = await client.fetch(AUTHOR_BY_ID_QUERY_PROFILE, {
    id: params.id,
  });

  // Show 404 if user not found
  if (!user) notFound();

  // Check if viewing own profile
  const isOwnProfile = session?.id === params.id;

  return (
    <section className="profile_container">
      {/* User Profile Card */}
      <div className="profile_card">
        {/* User Name Header */}
        <div className="profile_title">
          <h1 className="text-24-black uppercase text-center line-clamp-1">
            {user.name}
          </h1>
        </div>

        {/* Profile Image Component */}
        <ProfileImage
          user={user}
          className="mt-6 hover:opacity-90 transition-opacity"
        />

        {/* User Details */}
        <div className="space-y-3 mt-7 text-center">
          <p className="text-2xl font-semibold text-white">@{user?.username}</p>
          {user?.bio && (
            <p className="text-14-normal text-gray-200">{user.bio}</p>
          )}
        </div>
      </div>

      {/* User's Startups Section */}
      <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
        <h2 className="text-30-bold">
          {isOwnProfile ? "Your" : "All"} Startups
        </h2>

        {/* Startup Grid with Loading State */}
        <ul className="card_grid-sm">
          <Suspense
            fallback={
              <PostCardSkeleton count={6} /> // Added count prop for flexibility
            }
          >
            <UserStartups id={params.id} />
          </Suspense>
        </ul>
      </div>
    </section>
  );
}

/**
 * Generate Metadata for the page
 * @param {Object} params - Route parameters
 */
export async function generateMetadata({ params }) {
  const user = await client.fetch(AUTHOR_BY_ID_QUERY_PROFILE, {
    id: params.id,
  });

  return {
    title: user?.name || "User Profile",
    description: user?.bio || "View user profile and their startups",
  };
}
