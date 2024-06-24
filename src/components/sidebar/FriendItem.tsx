import Image from "next/image";

export default function FriendItem() {
  return (
    <div className="flex items-center p-3 hover:bg-gray-800 cursor-pointer w-full rounded">
      <div className="w-9 h-9 border-2 border-green-400 rounded-full mr-1">
        <Image
          src="https://www.seoptimer.com/storage/images/2014/08/no-con-la-mascota.jpg"
          alt="profile image"
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-full  "
        />
      </div>

      <div className="h-9 flex-col justify-center p-1">
        <h4 className="text-xs bg-blue- leading-none mb-1">Jared Palmer</h4>
        <h5 className="text-xs text-gray-400 bg-purple- leading-none">
          Online
        </h5>
      </div>

      <div className="w-1 h-1 bg-green-400 rounded-full ml-auto"></div>

    </div>
  );
}
