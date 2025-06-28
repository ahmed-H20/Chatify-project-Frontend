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
//     const res = await fetch("http://localhost:5000/api/v1/story/status", {
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
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

const Stories = dynamic(() => import("react-insta-stories"), { ssr: false });

interface StoryData {
  _id: string;
  mediaUrl: string;
  caption: string;
  createdAt: string;
}

export default function MyStatusPage() {
  const [myStories, setMyStories] = useState<StoryData[]>([]);
  const [showViewer, setShowViewer] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchMyStories = async function fetchMyStories() {
        if (!token) {
            console.error("No token found");
            return;
        }
        
        const res = await fetch("http://localhost:5000/api/v1/story/status", {
        headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
        const data = await res.json();
        setMyStories(data.myStatus || []);
        }
        
    }

  const deleteStory = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/v1/story/deleteStory/${id}`, {
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

  const storyComponents = myStories.map((story) => ({
    url: story.mediaUrl,
    header: {
      heading: "My Status",
      subheading: new Date(story.createdAt).toLocaleString(),
      profileImage: "/default-profile.png", // Provide a valid image path or user's profile image
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
        <Button onClick={() => setShowViewer(true)}>
          <Plus className="w-4 h-4 mr-2" /> View My Status
        </Button>
        <a href="/create-status">
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

      <div className="mt-8 grid gap-4 w-full">
        {myStories.map((story) => (
          <div key={story._id} className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <p className="font-semibold">{story.caption}</p>
              <p className="text-sm text-gray-500">{new Date(story.createdAt).toLocaleString()}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => deleteStory(story._id)}>
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
