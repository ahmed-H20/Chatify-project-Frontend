import { useChatStore } from '@/store/useChatStore';
import React, { use, useEffect } from 'react'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '@/store/useAuthStore';


const ChatContainer = () => {
    const {messages, getMessages, isMassagesLoading, selectedUser, subscribeToMessages, unsubscribeToMessages} = useChatStore();
    const {authUser} = useAuthStore();
    console.log(authUser)
    if (isMassagesLoading) return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    );

    useEffect(() => {
        getMessages(selectedUser?._id);  
        
        subscribeToMessages();

        return () => unsubscribeToMessages
    },[getMessages, selectedUser?._id, subscribeToMessages, unsubscribeToMessages]);


// console.log("messages:", messages[0].text);


  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message, index) => (
          <div key={message._id || index} className={`chat ${message.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
              <div className='size-10 rounded-full border'>
                <img src={message.senderId === authUser?._id ? authUser?.profilePic || "/icons/user.png": selectedUser?.profilePic || "/icons/user.png"} alt="Profile Pic" 
                />
              </div>
            </div> 
            <div className='chat-footer mb-1'>
              <time className='text-xs opacity-50 ml-1'>
                {message.createdAt}
              </time>  
            </div> 
            <div className='chat-bubble flex'>
              {message.image && (
                <img src={message.image} alt="Message Attachment" className='sm:max-w-[200] rounded-md mb-2' />  
                
              )}
             
              {message.text !== null && message.text !== undefined && message.text !== "" ? (
                <p>{message.text}</p>
              ) : message.image ? null : (
                <p className="italic opacity-50">No text</p>
              )}
            </div>        
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
