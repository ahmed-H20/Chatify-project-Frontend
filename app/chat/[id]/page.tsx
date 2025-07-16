// "use client";

// import ChatList from "@/components/chat-list";
// import ChatView from "@/components/chat-view";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Socket from "@/lib/socket";

// export default function ChatPage() {
//   const params = useParams();
//   const chatId = params?.id as string;
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   const currentUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
//   const socket = Socket;

//   type Chat = {
//     id: string;
//     name: string;
//     avatar: string;
//     message?: string;
//     time?: string;
//     unread?: boolean;
//   };

//   const [chats, setChats] = useState<Chat[]>([]);
//   const [messages, setMessages] = useState([]);
//   const [contact, setContact] = useState({
//     id: "",
//     name: "",
//     avatar: "/icons/user.png",
//     status: "",
//   });

//   const getChats = async () => {
//     try {
//       const response = await fetch("https://chatify-project-backend.vercel.app/api/v1/conversation/allPrivateConversation", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error("Failed to fetch chats");
//       return response.json();
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };

//   const getConversationData = async (chatId: string) => {
//     try {
//       const response = await fetch(`https://chatify-project-backend.vercel.app/api/v1/conversation/privateConversation/${chatId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) throw new Error("Failed to fetch conversation data");

//       const data = await response.json();
//       const populatedMessages = data.data.messages?.map((msg: any) => ({
//         id: msg._id,
//         content: msg.message || "no message!",
//         sent: msg.senderId._id === currentUserId ? "sent" : "received",
//         time: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         status: msg.isRead ? "read" : "delivered",
//       })) || [];

//       setMessages(populatedMessages);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getContact = async (chatId: string) => {
//     try {
//       const response = await fetch(`https://chatify-project-backend.vercel.app/api/v1/conversation/privateConversation/${chatId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) throw new Error("Failed to fetch contact data");

//       const data = await response.json();

//       setContact({
//         id: data.receiver._id,
//         name: data.receiver.name,
//         avatar: data.receiver.avatar,
//         status: data.receiver.status,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     socket.on("updateChatList", (updatedChat) => {
//       setChats((prevChats) => {
//         // حذف الشات القديم لو موجود
//         const filtered = prevChats.filter(chat => chat.id !== updatedChat.id);
//         // ضيف التحديث في أول القائمة
//         return [updatedChat, ...filtered];
//       });
//     });

//     return () => {
//       socket.off("updateChatList");
//     };
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getChats();
//       const transformed = data.data.map((item: any) => ({
//         id: item.chatId,
//         name: item.user.name,
//         avatar: item.user.image,
//         message: item.lastMessage?.message || "",
//         time: new Date(item.lastMessageAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         unread: !item.lastMessage?.isRead,
//       }));

//       // setChats(transformed)
//       // ✅ دمج بدون تكرار-
//       setChats((prev) => {
//         const existingNames = new Set(prev.map((chat) => chat.name));
//         const newChats = transformed.filter((chat: any) => !existingNames.has(chat.name));
//         return [...prev, ...newChats];
//       });

//       if (chatId) {
//         await getContact(chatId);
//         await getConversationData(chatId);
//       }
//     };

//     fetchData();
//   }, [chatId]);

//   return (
//     <div className="flex h-full">
//       <div className="w-96 h-full border-r border-gray-800">
//         <ChatList chats={chats} />
//       </div>
//       <div className="flex-1 h-full">
//         {contact.id ? (
//           <ChatView chatId={chatId} contact={contact} />
//         ) : (
//           <div className="flex items-center justify-center h-full text-muted">
//             Loading chat...
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import ChatList from "@/components/chat-list";
import ChatView from "@/components/chat-view";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Socket from "@/lib/socket";

export default function ChatPage() {
  const params = useParams();
  const chatId = params?.id as string;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const currentUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const socket = Socket;

  type Chat = {
    id: string;
    name: string;
    avatar: string;
    message?: string;
    time?: string;
    unread?: boolean;
  };

  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState([]);
  const [contact, setContact] = useState({
    id: "",
    name: "",
    avatar: "/icons/user.png",
    status: "",
  });

  const getChats = async () => {
    try {
      const response = await fetch("https://chatify-project-backend.vercel.app/api/v1/conversation/allPrivateConversation", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch chats");
      return response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getConversationData = async (chatId: string) => {
    try {
      const response = await fetch(`https://chatify-project-backend.vercel.app/api/v1/conversation/privateConversation/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch conversation data");

      const data = await response.json();
      const populatedMessages = data.data.messages?.map((msg: any) => ({
        id: msg._id,
        content: msg.message || "no message!",
        sent: msg.senderId._id === currentUserId ? "sent" : "received",
        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: msg.isRead ? "read" : "delivered",
      })) || [];

      setMessages(populatedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  const getContact = async (chatId: string) => {
    try {
      const response = await fetch(`https://chatify-project-backend.vercel.app/api/v1/conversation/privateConversation/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch contact data");

      const data = await response.json();
      console.log(data, "response", response)
      setContact({
        id: data.receiver._id,
        name: data.receiver.name,
        avatar: data.receiver.profile_picture,
        status: data.receiver.status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket.on("updateChatList", (updatedChat) => {
      setChats((prevChats) => {
        const filtered = prevChats.filter(chat => chat.name !== updatedChat.name);
        return [updatedChat, ...filtered];
      });
    });

    return () => {
      socket.off("updateChatList");
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getChats();
      const transformed = data.data.map((item: any) => ({
        id: item.chatId,
        name: item.user.name,
        avatar: item.user.image,
        message: item.lastMessage?.message || "",
        time: new Date(item.lastMessageAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        unread: !item.lastMessage?.isRead,
      }));

      const uniqueChatsMap = new Map();
      transformed.forEach((chat: Chat) => {
        uniqueChatsMap.set(chat.name, chat);
      });
      const uniqueChats = Array.from(uniqueChatsMap.values());

      setChats(uniqueChats);

      if (chatId) {
        await getContact(chatId);
        await getConversationData(chatId);
      }
    };

    fetchData();
  }, [chatId]);

  console.log(contact)
  return (
    <div className="flex h-full">
      <div className="w-96 h-full border-r border-gray-800">
        <ChatList chats={chats} />
      </div>
      <div className="flex-1 h-full">
        {contact.id ? (
          <ChatView chatId={chatId} contact={contact} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted">
            Loading chat...
          </div>
        )}
      </div>
    </div>
  );
}
