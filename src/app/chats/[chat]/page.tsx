import Messages from "@/components/chat/Messages";
import { getMessagesByChat } from "@/app/actions";

export default async function Chat({ params }) {
  const data = await getMessagesByChat(params.chat);

  console.log(data.length);

  return (
    <div className="bg-gray-950 flex flex-col h-screen">
      <Messages messagesData={data} chat={params.chat} />
    </div>
  );
}
