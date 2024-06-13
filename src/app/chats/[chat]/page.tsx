import MessageArea from "@/components/chat/MessageArea";
import { useEffect } from "react";

export default function Chat({ params }) {
  console.log(params);

  return (
    <div className="bg-gray-950 flex flex-col h-screen">
      <div className="flex-1">
        message1 message 2 sdasdisamdsomsdmi
        {params.chat}
      </div>

      <MessageArea roomId={params.chat} />
    </div>
  );
}
