import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-clint";

export async function PATCH(request) {
  try {
    const session = await auth();

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized access" }), {
        status: 401,
      });
    }

    const { userId, newAvatar } = await request.json();

    if (session.id !== userId) {
      return new Response(
        JSON.stringify({ error: "You can only update your own profile" }),
        { status: 403 }
      );
    }

    if (!userId || !newAvatar) {
      return new Response(
        JSON.stringify({ error: "Required data is incomplete" }),
        { status: 400 }
      );
    }

    // Using writeClient for update
    const result = await writeClient
      .patch(userId)
      .set({
        image: newAvatar,
      })
      .commit();

    return new Response(
      JSON.stringify({
        message: "Image updated successfully",
        updatedImage: newAvatar,
        result: result,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Detailed error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to update image",
        details: error.message,
        stack: error.stack,
      }),
      { status: 500 }
    );
  }
}
