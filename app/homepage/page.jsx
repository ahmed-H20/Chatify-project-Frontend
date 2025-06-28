'use client';
import Sidebar2 from "@/components/Sidebar2";
import { useChatStore } from "@/store/useChatStore";
import  NoChatSelected  from "@/components/NoChatSelected";
import ChatContainer from "@/components/ChatContainer";
import { useAuthStore } from "@/store/useAuthStore";
import Logo from "@/components/logo";


const HomePage = () => {
  const { selectedUser } = useChatStore();
  const {onlineUsers} = useAuthStore();
  console.log("Online Users:", onlineUsers);
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center h-full">
        <div className="bg-base-100 rounded-lg shadow-lg w-full flex h-full overflow-hidden">
            <Sidebar2 />
          {!selectedUser ? 
              <div className="hidden md:flex flex-1 items-center justify-center">
                <Logo />
              </div>
          : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
