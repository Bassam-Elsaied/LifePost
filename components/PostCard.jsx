import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

/**
 * PostCard Component
 * Displays a card with post information including author details, title, views, and image
 * @param {Object} post - Post data containing author, title, views, etc.
 */
export default function PostCard({ post }) {
  // Destructure post properties for easier access
  const {
    _id,
    _createdAt,
    author,
    title,
    views,
    image,
    category,
    description,
  } = post;

  return (
    <li className="startup-card group">
      {/* Header: Date and View Count */}
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-pinky" />
          <p className="text-14-regular">{views}</p>
        </div>
      </div>

      {/* Author Info and Title Section */}
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1 hover:text-pinky transition-colors">
              {author?.name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1 hover:text-pinky transition-colors">
              {title}
            </h3>
          </Link>
        </div>

        {/* Author Avatar */}
        <Link href={`/user/${author._id}`}>
          <Image
            src={author?.image}
            alt={`Profile picture of ${author?.name}`}
            width={48}
            height={48}
            className="rounded-full hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>

      {/* Post Content: Description and Image */}
      <Link
        href={`/startup/${_id}`}
        className="block hover:opacity-90 transition-opacity"
      >
        <p className="startup-card_desc">{description}</p>
        <img
          src={image}
          alt={`Image for ${title}`}
          className="startup-card_img"
          loading="lazy" // Add lazy loading for better performance
        />
      </Link>

      {/* Footer: Category and Details Button */}
      <div className="flex-between gap-3 mt-5">
        <Link
          href={`/?search=${category?.toLowerCase()}`}
          className="text-16-medium hover:text-pinky transition-colors"
        >
          <p>{category}</p>
        </Link>
        <Button
          className="startup-card_btn hover:opacity-90 transition-opacity"
          asChild
        >
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
}

/**
 * PostCardSkeleton Component
 * Displays loading skeleton placeholders for posts
 */
export function PostCardSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <li key={index} className="startup-card">
          <Skeleton className="h-[350px] w-full" />
        </li>
      ))}
    </>
  );
}
