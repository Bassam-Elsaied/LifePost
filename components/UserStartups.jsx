import React from "react";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import PostCard from "./PostCard";

export default async function UserStartups({ id }) {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup) => <PostCard key={startup._id} post={startup} />)
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
}
