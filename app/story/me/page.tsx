// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import dynamic from "next/dynamic";
// import StoryView from "@/components/story-view";
// import { Trash2, Edit, Plus, X } from "lucide-react";

// type Story = {
//   _id: string;
//   caption: string;
//   mediaUrl: string;
//   createdAt: string;
// };

// export default function MyStatusPage() {
//     const Stories = dynamic(() => import("react-insta-stories"), { ssr: false });
//   const [stories, setStories] = useState<Story[]>([]);
//   const [loading, setLoading] = useState(true);

  
//   const [caption, setCaption] = useState("");
//   const [mediaUrl, setMediaUrl] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     fetchMyStories();
//   }, []);

//   async function fetchMyStories() {
//     if (!token) {
//         console.error("No token found");
//         return;
//     }
//     setLoading(true);
//     const res = await fetch("https://chatify-project-backend.vercel.app/api/v1/story/status", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) {
//       const data = await res.json();
//       setStories(data.myStatus || []);
//     }
//     setLoading(false);
//   }

//   async function handleSave() {
//     if (!token) return;
//     const url = editingId
//       ? `/api/v1/story/${editingId}`
//       : "/api/v1/story/createStory";
//     const method = editingId ? "PUT" : "POST";
//     const res = await fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ caption, mediaUrl, mediaType: "text" }),
//     });
//     if (res.ok) {
//       setCaption("");
//       setMediaUrl("");
//       setEditingId(null);
//       fetchMyStories();
//     } else console.error("Error saving status");
//   }

//   async function handleDelete(id: string) {
//     if (!token) return;
//     const res = await fetch(`/api/v1/story/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) fetchMyStories();
//     else console.error("Error deleting");
//   }

//   const lastStory = stories[stories.length - 1];

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">My Status</h2>

//       {lastStory ? (
//         <div className="border rounded p-4 mb-4">
//           <p className="font-medium">Latest Status</p>
//           <p className="italic text-sm mb-2">{lastStory.caption}</p>
//           <div className="flex gap-2">
//             <Button variant="outline" onClick={() => {
//               setEditingId(lastStory._id);
//               setCaption(lastStory.caption);
//               setMediaUrl(lastStory.mediaUrl);
//             }}>
//               <Edit size={16} /> Edit
//             </Button>
//             <Button variant="destructive" onClick={() => handleDelete(lastStory._id)}>
//               <Trash2 size={16} /> Delete
//             </Button>
//           </div>
//         </div>
//       ) : (
//         <div className="border rounded p-4 mb-4 text-center text-gray-600 dark:text-gray-400">
//           No status yet.
//         </div>
//       )}

//       <div className="border rounded p-4">
//         <h3 className="font-medium mb-2">
//           {editingId ? "Edit Status" : "Add New Status"}
//         </h3>
//         <Input
//           placeholder="Caption"
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           className="mb-2"
//         />
//         <Input
//           placeholder="Media URL"
//           value={mediaUrl}
//           onChange={(e) => setMediaUrl(e.target.value)}
//           className="mb-4"
//         />
//         <div className="flex gap-2">
//           <Button onClick={handleSave}>
//             <Plus size={16} /> {editingId ? "Update" : "Add"}
//           </Button>
//           {editingId && (
//             <Button variant="ghost" onClick={() => {
//               setEditingId(null);
//               setCaption("");
//               setMediaUrl("");
//             }}>
//               <X size={16} /> Cancel
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// app/my-status/page.tsx


// "use client";

// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Plus, Trash2 } from "lucide-react";

// const Stories = dynamic(() => import("react-insta-stories"), { ssr: false });

// interface StoryData {
//   _id: string;
//   mediaUrl: string;
//   caption: string;
//   createdAt: string;
// }

// export default function MyStatusPage() {
//   const [myStories, setMyStories] = useState<StoryData[]>([]);
//   const [showViewer, setShowViewer] = useState(false);
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const fetchMyStories = async function fetchMyStories() {
//         if (!token) {
//             console.error("No token found");
//             return;
//         }
        
//         const res = await fetch("https://chatify-project-backend.vercel.app/api/v1/story/status", {
//         headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.ok) {
//         const data = await res.json();
//         setMyStories(data.myStatus || []);
//         }
        
//     }

//   const deleteStory = async (id: string) => {
//     try {
//       await fetch(`https://chatify-project-backend.vercel.app/api/v1/story/deleteStory/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       fetchMyStories();
//     } catch (error) {
//       console.error("Delete failed", error);
//     }
//   };

//   useEffect(() => {
//     fetchMyStories();
//   }, []);

//   const storyComponents = myStories.map((story) => ({
//     url: story.mediaUrl,
//     header: {
//       heading: "My Status",
//       subheading: new Date(story.createdAt).toLocaleString(),
//       profileImage: "/default-profile.png", 
//     },
//     seeMore: ({ close }: any) => (
//       <div className="p-4 text-white bg-black" onClick={close}>
//         <p>{story.caption}</p>
//       </div>
//     ),
//   }));

//   return (
//     <div className="p-4 flex flex-col items-center max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4 mt-8">My Status</h2>
//       <div className="flex items-center gap-4 mb-6">
//         <Button onClick={() => setShowViewer(true)}>
//            View My Status
//         </Button>
//         <a href="/story/create-status">
//           <Button variant="outline">+ Add New Status</Button>
//         </a>
//       </div>

//       {showViewer && (
//         <div className="w-full h-[500px] max-w-md ">
//           <Stories
//             stories={storyComponents}
//             onAllStoriesEnd={() => setShowViewer(false)}
//             width="100%"
//             height="100%"
//           />
//         </div>
//       )}

//       <div className="mt-8 grid gap-4 w-full">
//         {myStories.map((story) => (
//           <div key={story._id} className="p-4 border rounded-lg flex items-center justify-between">
//             <div>
//               <p className="font-semibold">{story.caption}</p>
//               <p className="text-sm text-gray-500">{new Date(story.createdAt).toLocaleString("en-EG", {
//                   dateStyle: "medium",
//                   timeStyle: "short",
//                 })
//               }</p>
//             </div>
//             <Button variant="ghost" size="icon" onClick={() => deleteStory(story._id)}>
//               <Trash2 className="w-5 h-5 text-red-500" />
//             </Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client"

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const Stories = dynamic(() => import("react-insta-stories"), { ssr: false });

interface StoryData {
  _id: string;
  mediaUrl: string;
  mediaType: "image" | "text";
  caption: string;
  createdAt: string;
}

export default function MyStatusPage() {
  const [myStories, setMyStories] = useState<StoryData[]>([]);
  const [showViewer, setShowViewer] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchMyStories = async () => {
    if (!token) return;
    const res = await fetch("https://chatify-project-backend.vercel.app/api/v1/story/status", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setMyStories(data.myStatus || []);
    }
  };

  const deleteStory = async (id: string) => {
    try {
      await fetch(`https://chatify-project-backend.vercel.app/api/v1/story/deleteStory/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMyStories();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    fetchMyStories();
  }, []);

  const imageStories = myStories.filter(story => story.mediaType === "image");
  const textStories = myStories.filter(story => story.mediaType === "text");

  const storyComponents = imageStories.map(story => ({
    url: story.mediaUrl,
    header: {
      heading: "My Status",
      subheading: new Date(story.createdAt).toLocaleString(),
      profileImage: "/default-profile.png",
    },
    seeMore: ({ close }: any) => (
      <div className="p-4 text-white bg-black" onClick={close}>
        <p>{story.caption}</p>
      </div>
    ),
  }));

  return (
    <div className="p-4 flex flex-col items-center max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 mt-8">My Status</h2>
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={() => setShowViewer(true)} disabled={imageStories.length === 0}>
          View My Image Status
        </Button>
        <a href="/story/create-status">
          <Button variant="outline">+ Add New Status</Button>
        </a>
      </div>

      {showViewer && (
        <div className="w-full h-[500px] max-w-md ">
          <Stories
            stories={storyComponents}
            onAllStoriesEnd={() => setShowViewer(false)}
            width="100%"
            height="100%"
          />
        </div>
      )}

        {/* عرض الصور كنصوص مصغرة تحت */}
      {imageStories.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Image Statuses</h3>
          <div className="grid grid-cols-3 gap-4">
            {imageStories.map(story => (
              <div key={story._id} className="relative rounded overflow-hidden border border-gray-300 dark:border-gray-700 cursor-pointer group">
                <img
                  src={story.mediaUrl}
                  alt={story.caption}
                  className="w-full h-24 object-cover"
                  onClick={() => setShowViewer(true)}
                />
                <button
                  onClick={() => deleteStory(story._id)}
                  className="absolute top-1 right-1 bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  aria-label="Delete image status"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* عرض النصوص بشكل قائمة */}
      {textStories.length > 0 && (
        <div className="mt-10 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Text Statuses</h3>
          <div className="flex flex-col gap-4">
            {textStories.map(story => (
              <div key={story._id} className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
                <p className="text-gray-900 dark:text-gray-100">{story.caption}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(story.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteStory(story._id)}
                  className="mt-2"
                  aria-label="Delete text status"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
