// import { create } from 'zustand';
// import { axiosInstance } from '../lib/axios';
// import { get } from 'http';
// import { useAuthStore } from './useAuthStore';
// import { toast } from 'sonner';


// export const useChatStore = create((set, get) => ({
//     messages: [],
//     users: [],
//     selectedUser: null,
//     isUserLoading: false,
//     isMessagesLoading: false,

//    getUsers: async () => {
//         set({ isUserLoading: true });
//         try {
//             const res = await axiosInstance.get('/messages/users');
//             console.log("users from API:", res.data.filteredUsers);
//             set({ users: res.data.filteredUsers });
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         } finally {
//             set({ isUserLoading: false });
//         }
//     },

//     getMessages: async (userId) => {
//         set ({ isMessagesLoading: true });
//         try {
//             const res = await axiosInstance.get(`/messages/${userId}`);
//             set({ messages: res.data });
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         } finally {
//             set({ isMessagesLoading: false });
//         }
//     },

//     sendMessage: async (messageData) => {
//         const { selectedUser, messages } = get();
//         try {
//             const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
//             console.log('Message sent:', res.data);
//             set({ messages: [...messages, res.data] });
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     },

//     subscribeToMessages: () => {
//     const { selectedUser } = get();
//     if (!selectedUser) return;

//     const socket = useAuthStore.getState().socket;

//     socket.on("newMessage", (newMessage) => {
//       const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
//       if (!isMessageSentFromSelectedUser) return;

//       set({
//         messages: [...get().messages, newMessage],
//       });
//     });
//   },

//   unsubscribeFromMessages: () => {
//     const socket = useAuthStore.getState().socket;
//     socket.off("newMessage");
//   },

//     // todo: optimize this one later
//     setSelectedUser: (selectedUser) => set({ selectedUser }),

// }));

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
    //   set({ messages: [...messages, res.data] });
    set({ messages: [...messages, res.data.newMessage] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (!socket) {
    console.warn("Socket is not initialized yet");
    return;
    }

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));