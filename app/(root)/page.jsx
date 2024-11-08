import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function page({ searchParams }) {
  // get search query from url
  const search = (await searchParams).search;
  const params = { search: search || null };

  // fetch posts from sanity
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      {/* hero section */}
      <section className="green_container">
        <h1 className="heading">
          Post Your Startup, <br />
          Connect With Community
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Post, and Get Noticed in Virtual Competitions.
        </p>
        <SearchBar search={search} />
      </section>

      {/* search results && all posts */}
      <section className="section_container">
        <p className="text-30-semibold">
          {search ? `Search results for "${search}"` : "All Startups Posts"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => <PostCard key={post?._id} post={post} />)
          ) : (
            <p className="text-20-regular">No posts found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
