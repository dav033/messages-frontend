import { parseData } from "@/helpers";
import { useUser } from "@/providers/UserContext";
import { MessageData } from "@/types";
import UserName from "./UserName";

export default function Message({
  sender,
  sender_name,
  body,
  datetime,
  differentUser,
}: MessageData) {
  const { user } = useUser();

  const isCurrentUser = user.id == sender;
  const messageStyles = isCurrentUser
    ? "bg-blue-800 ml-auto mr-4 text-white"
    : "bg-gray-700 ml-4 text-white";
  const marginStyles = differentUser ? "mt-4" : "mt-1";
  const paddingStyles = differentUser && !isCurrentUser ? "pt-5" : "";
  const bodyLenghtPaddingStyles = body.length > 100 ? "pr-4" : "";
  const midBody = body.length <= 86 ? "max-w-fit" : "max-w-md";
  const shortBody = body.length < 6 ? "mb-0" : "mb-1";
  return (
    <div className="relative ml-auto mr-full flex flex-col ">
      <div
        className={`p-2 w-fit min-w-24 rounded relative pr-14 pb-3 ${messageStyles} ${marginStyles} ${paddingStyles} ${bodyLenghtPaddingStyles} ${midBody}`}
      >
        <UserName
          sender={sender}
          user_id={user.id}
          sender_name={sender_name}
          differentUser={differentUser}
        />
        <div
          className={`text-base break-words relative p-0 text-left  ${shortBody}`}
        >
          {body}
        </div>
        <span className="text-ow text-gray-300 absolute bottom-1 end-1 font-light">
          {parseData(datetime).time}
        </span>
      </div>
    </div>
  );
}
