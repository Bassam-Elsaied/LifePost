import { X } from "lucide-react";
import Image from "next/image";

export default function AvatarSelector({ onClose, onSelect, user }) {
  const avatars = [
    `${user}`,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgeeO7JxZc46_ae5_5ArRlVlEqktqmfmIoQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0R6euxC3RD8GhyYdjrOl-9YfZFOZv-H1SQ&s",
    "https://image.api.playstation.com/cdn/EP0001/CUSA01788_00/S7VrGAJIT1Z9BGNVjgsPnMsleWgUjFfV.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/EP0001/CUSA01788_00/H1ekAUlFYp20F38xMp6AENZYwnB69ORf.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/EP0001/CUSA01788_00/3TDQgn9k2le8aNO8zrsFlRdkEumpLH8l.png?w=440&thumb=false",
    "https://store.playstation.com/store/api/chihiro/00_09_000/container/FR/fr/99/EP0001-CUSA01788_00-AV00000000000037/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=720&h=720",
    "https://liquipedia.net/commons/images/3/37/Mozzie_R6S.png",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Choose Avatar</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onSelect(avatar)}
            >
              <Image
                src={avatar}
                alt={`Avatar ${index + 1}`}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
