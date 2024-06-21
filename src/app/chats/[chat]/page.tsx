import Messages from "@/components/chat/Messages";
import { getMessagesByChat } from "../../../petitions";

export default async function Chat({ params }) {
  const data = await getMessagesByChat(params.chat);

  return (
    <div className="bg-gray-950 flex flex-col h-screen">
      <Messages messagesData={data} chat={params.chat} />
    </div>
  );
}
