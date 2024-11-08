"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import AvatarSelector from "./AvatarSelector";
import { Pencil } from "lucide-react";

export default function ProfileImage({ user }) {
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      setSession(data);
    };
    getSession();
  }, []);

  const updateUserAvatar = async (newAvatar) => {
    try {
      setIsUpdating(true);
      const response = await fetch("/api/user/update-avatar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          newAvatar: newAvatar,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          alert("Please login first");
          return;
        }
        if (response.status === 403) {
          alert("You are not authorized to update this account");
          return;
        }
        throw new Error(data.error || "Failed to update avatar");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Failed to update image");
    } finally {
      setIsUpdating(false);
    }
  };

  const isOwnProfile = session?.id === user._id;

  return (
    <>
      <div
        onClick={() => isOwnProfile && setShowAvatarSelector(true)}
        className={`relative group ${isOwnProfile ? "cursor-pointer" : ""}`}
      >
        <Image
          src={user.image}
          alt={user.name}
          width={220}
          height={220}
          className={`profile_image ${isOwnProfile ? "hover:opacity-80 transition-opacity" : ""} ${
            isUpdating ? "opacity-50" : ""
          }`}
        />
        {isOwnProfile && (
          <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md  ">
            <Pencil className="w-4 h-4 text-gray-600" />
          </div>
        )}
        {isUpdating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
      </div>

      {showAvatarSelector && (
        <AvatarSelector
          user={user?.image}
          onClose={() => setShowAvatarSelector(false)}
          onSelect={async (newAvatar) => {
            setShowAvatarSelector(false);
            await updateUserAvatar(newAvatar);
          }}
        />
      )}
    </>
  );
}
