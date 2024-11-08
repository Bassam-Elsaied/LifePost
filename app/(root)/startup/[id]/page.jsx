import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import MarkdownIt from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { deleteStartup } from "@/lib/actions";

// Initialize markdown-it with proper configuration
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

export default async function page({ params }) {
  const session = await auth();

  // get the id from params
  const { id } = params;
  // fetch the post
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editors-pick",
    }),
  ]);

  if (!post) notFound();

  // render the content
  const content = md.render(post?.pitch) || null;

  return (
    <>
      <section className="green_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Post Details</h3>

          {content ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        {session?.id === post.author._id && (
          <form
            action={async () => {
              "use server";
              await deleteStartup(post._id);
              redirect("/");
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="mt-5 bg-red-600 text-white font-semibold w-full"
            >
              Delete Post
            </Button>
          </form>
        )}

        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post, i) => (
                <PostCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
}
