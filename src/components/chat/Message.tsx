import { parseData } from "@/helpers";
import { useUser } from "@/providers/UserContext";
import { MessageData } from "@/types";

export default function Message(props: MessageData) {
  const { user } = useUser();

  const userStyles =
    user.id == props.sender ? "bg-blue-600 ml-auto mr-4" : "bg-gray-700 ml-4";

  const marginStyles = props.differentUser ? "mt-4" : "mt-1";
  return (
    <div className="relative ml-auto">
      <div
        className={`p-2 w-fit min-w-24 rounded relative ${userStyles} ${marginStyles} pr-10 pb-4`}
      >
        <span>{props.sender_name}</span>
        {props.body}

        <span className="text-xs text-gray-300 absolute bottom-1 right-1 font-light">
          {parseData(props.datetime).time}
        </span>
      </div>
    </div>
  );
}
