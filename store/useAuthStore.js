import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

const BASE_URL = 'http://localhost:5001';

export const useAuthStore = create((set, get) => ({
    authUser: null,
    socket: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: true,


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            console.log('Auth check response:', res.data);
            set({ authUser: res.data, });
        }catch (error) {
            console.error('Error checking authentication:', error);
            set({ authUser: null });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    // login: async (email, password) => {
    //     set({ isLoggingIn: true });
    //     try {
    //         const res = await axiosInstance.post('/auth/login', { email, password });
    //         console.log('Login response:', res.data);            
    //         set({ authUser: res.data, isLoggingIn: false });
            
    //         get().connectSocket(); // Connect to socket after login
    //     } catch (error) {
    //         console.error('Login error:', error);
    //         set({ isLoggingIn: false });
    //     }   
    // },

    // logout: async () => {
    //     try {
    //         await axiosInstance.post('/auth/logout');
    //         console.log('Logout successful');
    //         set({ authUser: null});
    //         get().disconnectSocket(); // Disconnect socket on logout
    //     }catch (error) {
    //         console.error('Logout error:', error);
    //         // Optionally handle logout error, e.g., show an alert
    //     }
    // },
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await fetch("https://chat-app-pi-livid-13.vercel.app/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                credentials: "include",
            },
            body: JSON.stringify(data),
            });

            // Check if response is ok (status code 2xx)
            if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Signup failed");
            }

            // Get response data
            const resData = await response.json();

            // Example: set auth user if needed (simulate set({ authUser: resData }))
            console.log("User signed up:", resData);

            // Show success message
            alert("Account created successfully");

            set({ authUser: res.data });
            toast.success("Account created successfully");
            get().connectSocket();
            return true; // Return true to indicate success
        } catch (error) {
            toast.error(error.response.data.message);
            return false; // Return false to indicate failure
        } finally {
            set({ isSigningUp: false });
        }
    },
    
    
    login: async (data) => {
        set({ isLoggingIn: true });

        try {
            const res = await axiosInstance.post("/auth/login", data);
                if (res.status === 200 && res.data?._id) {
                set({ authUser: res.data });
                console.log("✅ Logged in successfully");
                get().connectSocket();
            }
            return true; // Return true to indicate success
            } catch (error) {
                console.log("❌ Login error:", error?.response?.data?.message || error.message);
            return false; // Return false to indicate failure
            } finally {
                set({ isLoggingIn: false });
            }
        },


  logout: async () => {
  try {
    await axiosInstance.post("/auth/logout");
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    // or use: localStorage.clear(); to remove everything
    set({ authUser: null });
    toast.success("Logged out successfully");
    get().disconnectSocket();
  } catch (error) {
    // Use optional chaining and fallback message
    const message =
      error?.response?.data?.message || "Logout failed. Please try again.";
    toast.error(message);
  }
},
    updateProfile: async (profileData) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', profileData);
            console.log('Update profile response:', res.data);
            // alarm here
            set({ authUser: res.data, isUpdatingProfile: false });
        } catch (error) {
            console.error('Update profile error:', error);
            //alarm here
        }
        finally {
            set({ isUpdatingProfile: false });
        }
    },

connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });
    
    socket.on("getOnlineUsers", (userIds) => {
    set({ onlineUsers: userIds });
    });
},
disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
    set({ socket: null });
},
}))