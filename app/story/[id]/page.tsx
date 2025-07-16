// import StoryView from "@/components/story-view"
// import { useState } from "react";

// export default function StoryPage({ params }: { params: { id: string } }) {
//   const story = {
//     id: params.id,
//     user: {
//       id: "1",
//       name: "Name",
//       avatar: "/Chatify_Logo.svg?height=48&width=48",
//     },
//     content: "صلي علي النبي",
//     timestamp: "5m ago",
//   }

//   const [fetchedStory, setFetchedStory] = useState({});

//   const getStory = async () => {
//     try{
//       const response = await fetch(`https://chatify-project-backend.vercel.app/api/v1/story/status`);
//       if (!response.ok) throw new Error("Network response was not ok");
//       const data = await response.json();
//       console.log("Fetched story:", data);
//       setFetchedStory(data);
//     }
//     catch (error) {
//       console.error("Error fetching story:", error);
//       return null;
//     }
//   }

//   return <StoryView story={fetchedStory} />
// }


// "use client";

// import StoryView from "@/components/story-view";
// import { useState, useEffect } from "react";

// export default function StoryPage({ params }: { params: { id: string } }) {
//   const [fetchedStory, setFetchedStory] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
  

//   useEffect(() => {
//     const getStory = async () => {
//       try {
//         console.log("Story ID from params:", params.id); // هيطبع القيمة صح دلوقتي
//         const response = await fetch(`https://chatify-project-backend.vercel.app/api/v1/story/user/${params.id}`);
//         if (!response.ok) throw new Error("Network response was not ok");

//         const { data } = await response.json();
//         setFetchedStory({
//           id: data._id,
//           user: {
//             id: data.user._id,
//             name: data.user.name,
//             avatar: data.user.profile_picture || "/Chatify_Logo.svg",
//           },
//           content: data.caption || "No content",
//           timestamp: new Date(data.createdAt).toLocaleTimeString(),
//         });
//       } catch (error) {
//         console.error("Error fetching story:", error);
//         setFetchedStory(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getStory();
//   }, [params.id]);

//   if (loading) return <div>Loading...</div>;
//   if (!fetchedStory) return <div>Story not found.</div>;

//   return <StoryView story={fetchedStory} />;
// }

// "use client";

// import { use } from "react";
// import StoryView from "@/components/story-view";
// import { useState, useEffect } from "react";

// export default function StoryPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = use(params);

//   const [fetchedStories, setFetchedStories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getStories = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         console.log("Story ID (User ID):", id);

//         const response = await fetch(`https://chatify-project-backend.vercel.app/api/v1/story/user/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) throw new Error("Network response was not ok");

//         const { data } = await response.json();

//         if (!Array.isArray(data) || data.length === 0) {
//           setFetchedStories([]);
//           return;
//         }

//         const formattedStories = data.map((story) => ({
//           id: story._id,
//           user: {
//             id: story.user._id,
//             name: story.user.name,
//             avatar: story.user.profile_picture || "/Chatify_Logo.svg",
//           },
//           content: story.caption || "No content",
//           timestamp: new Date(story.createdAt).toLocaleTimeString(),
//         }));

//         setFetchedStories(formattedStories);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//         setFetchedStories([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getStories();
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (fetchedStories.length === 0) return <div>No stories found.</div>;

//   return <StoryView stories={fetchedStories} />;
// }

"use client";

import { use } from "react";
import StoryView from "@/components/story-view";
import { useState, useEffect } from "react";

interface StoryFromAPI {
  _id: string;
  user: {
    _id: string;
    name: string;
    profile_picture?: string;
  };
  caption?: string;      // النص لو موجود
  mediaType?: "text" | "image"; // نوع الوسيط
  mediaUrl?: string;     // رابط الصورة لو موجودة
  createdAt: string;
}

interface StoryViewProps {
  stories: {
    id: string;
    user: {
      id: string;
      name: string;
      avatar?: string;
    };
    content: string;
    mediaType: "text" | "image";
    mediaUrl?: string | null;
    timestamp: string;
  }[];
}

export default function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [fetchedStories, setFetchedStories] = useState<StoryViewProps["stories"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStories = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Story ID (User ID):", id);

        const response = await fetch(`https://chatify-project-backend.vercel.app/api/v1/story/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const { data } = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          setFetchedStories([]);
          return;
        }

        // تحويل الداتا للشكل المطلوب للعرض
        const formattedStories = (data as StoryFromAPI[]).map((story) => ({
          id: story._id,
          user: {
            id: story.user._id,
            name: story.user.name,
            avatar: story.user.profile_picture || "/Chatify_Logo.svg",
          },
          content: story.caption || "",
          mediaType: story.mediaType || (story.mediaUrl ? "image" : "text"), // لو mediaType مش موجود بس mediaUrl موجود خليها image
          mediaUrl: story.mediaUrl || null,
          timestamp: new Date(story.createdAt).toLocaleTimeString(),
        }));

        setFetchedStories(formattedStories);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setFetchedStories([]);
      } finally {
        setLoading(false);
      }
    };

    getStories();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (fetchedStories.length === 0) return <div>No stories found.</div>;

  return <StoryView stories={fetchedStories} />;
}


