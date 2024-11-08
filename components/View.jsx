import { client } from "@/sanity/lib/client";
import { UPDATE_STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-clint";
import { unstable_after as after } from "next/server";
import Ping from "./Ping";

export default async function View({ id }) {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(UPDATE_STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews} </span>
      </p>
    </div>
  );
}
