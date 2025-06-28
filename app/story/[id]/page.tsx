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
//       const response = await fetch(`http://localhost:5000/api/v1/story/status`);
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
"use client";

import StoryView from "@/components/story-view";
import { useState, useEffect } from "react";

export default function StoryPage({ params }: { params: { id: string } }) {
  const [fetchedStory, setFetchedStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = {id: "684d719d92b46769cf1b73a1"};

  useEffect(() => {
    const getStory = async () => {
      try {
        console.log("Story ID from params:", id); // هيطبع القيمة صح دلوقتي
        const response = await fetch(`http://localhost:5000/api/v1/story/status/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const { data } = await response.json();
        setFetchedStory({
          id: data._id,
          user: {
            id: data.user._id,
            name: data.user.name,
            avatar: data.user.profile_picture || "/Chatify_Logo.svg",
          },
          content: data.caption || "No content",
          timestamp: new Date(data.createdAt).toLocaleTimeString(),
        });
      } catch (error) {
        console.error("Error fetching story:", error);
        setFetchedStory(null);
      } finally {
        setLoading(false);
      }
    };

    getStory();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!fetchedStory) return <div>Story not found.</div>;

  return <StoryView story={fetchedStory} />;
}
