import Link from "next/link";
import { Send, BadgePlus } from "lucide-react";
import { auth } from "@/auth";
import SignInDialog from "./SigninDialog";
import SignOutDialog from "./SignOutDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AUTHOR_BY_ID_QUERY_PROFILE } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

const Navbar = async () => {
  const session = await auth();

  const { data: author } = session?.id
    ? await sanityFetch({
        query: AUTHOR_BY_ID_QUERY_PROFILE,
        params: { id: session.id },
      }).catch(() => ({ data: null }))
    : { data: null };

  const UserAvatar = ({ author }) => (
    <Avatar className="size-10 hover:opacity-80 transition-opacity">
      <AvatarImage
        src={author?.image || ""}
        alt={author?.name || "Anonymous User"}
      />
      <AvatarFallback>
        {author?.name?.[0]?.toUpperCase() || "AU"}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <header className="sticky top-0 z-50 px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2">
            <Send className="size-6 text-primary" />
            <h2 className="font-bold text-2xl">
              <span className="text-primary">Life</span>Post
            </h2>
          </div>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="hover:text-primary transition-colors"
              >
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <SignOutDialog />

              <Link href={`/user/${session.id}`}>
                <UserAvatar author={author} />
              </Link>
            </>
          ) : (
            <SignInDialog />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
