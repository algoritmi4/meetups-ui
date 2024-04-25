import { ChatInterface, ContactsList } from "@/features/chat";
import { ReactElement } from "react";

function Chat(): ReactElement {
  return (
    <div className="flex justify-start mt-5 max-h-[569px]">
      <ContactsList />
      <ChatInterface />
    </div>
  )
}

export default Chat;
