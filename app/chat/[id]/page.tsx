import ChatList from "@/components/chat-list"
import ChatView from "@/components/chat-view"

export default function ChatPage({ params }: { params: { id: string } }) {
  const chats = [
    {
      id: "1",
      name: "My friend",
      message: "Lorem ipsum dolor sit amet...",
      time: "5:15PM",
      avatar: "/icons/Ai-icon.png",
    },
    {
      id: "2",
      name: "Name",
      message: "Lorem ipsum dolor sit amet...",
      time: "4:20PM",
      avatar: "/icons/user.png",
      unread: true,
    },
    {
      id: "3",
      name: "Name",
      message: "Lorem ipsum dolor sit amet...",
      time: "1:15PM",
      avatar: "/Chatify_Logo.svg?height=48&width=48",
    },
    {
      id: "4",
      name: "Name",
      message: "Lorem ipsum dolor sit amet...",
      time: "2:17AM",
      avatar: "/Chatify_Logo.svg?height=48&width=48",
    },
    {
      id: "5",
      name: "Ahhed",
      message: "Lorem ipsum dolor sit amet...",
      time: "5:54PM",
      avatar: "/Chatify_Logo.svg?height=48&width=48",
    },
    {
      id: "6",
      name: "Name",
      message: "Lorem ipsum dolor sit amet...",
      time: "3:20PM",
      avatar: "/Chatify_Logo.svg?height=48&width=48",
    },
  ]

  const contact = {
    id: params.id,
    name: "Name",
    avatar: "/Chatify_Logo.svg?height=48&width=48",
    online: true,
  }

  const messages = [
    {
      id: "1",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      sent: true,
      time: "8:56PM",
      status: "read" as const,
    },
    {
      id: "2",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      sent: false,
      time: "8:56PM",
    },
    {
      id: "3",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      sent: true,
      time: "8:58PM",
      status: "read" as const,
    },
     {
      id: "4",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      sent: false,
      time: "8:56PM",
    },
  ]

  return (
    <div className="flex h-full">
      <div className="w-96 h-full border-r border-gray-800">
        <ChatList chats={chats} />
      </div>
      <div className="flex-1 h-full">
        <ChatView chatId={params.id} contact={contact} messages={messages} />
      </div>
    </div>
  )
}
