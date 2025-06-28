// "use client";

// import StatusList from "@/components/status-list"
// import Logo from "@/components/logo"
// import { useEffect, useState } from "react";

// export default function HistoryPage() {
//   const token = localStorage.getItem("token");
//   const [statuses, setStatuses] = useState<any[]>([]);
//   useEffect(() => {
//   const fetchStories = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/v1/story/status", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`, 
//         }
//       });

//       if (!response.ok) throw new Error("Network response was not ok");

//       const data = await response.json();
//       console.log("Fetched story:", data);

//       // استخرج myStatus + otherStatus
//       const allStories = [
//         ...data.myStatus,
//         ...data.otherStatus
//       ];

//       setStatuses(allStories);
//     } catch (error) {
//       console.error("Error fetching stories:", error);
//     } finally {
      
//     }
//   };

//   fetchStories();
// }, []);


//   return (
//     <div className="flex h-full">
//       <div className="w-full md:w-96 h-full">
//         <StatusList statuses={statuses} />
//       </div>
//       <div className="hidden md:flex flex-1 items-center justify-center">
//         <Logo />
//       </div>
//     </div>
//   )
// }

"use client";

import StatusList from "@/components/status-list"
import Logo from "@/components/logo"
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [myStatus, setMyStatus] = useState<any[]>([]);
  const [otherStatus, setOtherStatus] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchStories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/story/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log("Fetched story:", data);

        // خزن كل واحد لوحده
        setMyStatus(data.myStatus || []);
        setOtherStatus(data.otherStatus || []);

      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="flex h-full">
      <div className="w-full md:w-96 h-full">
        <StatusList myStatus={myStatus} otherStatus={otherStatus} />
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center">
        <Logo />
      </div>
    </div>
  );
}
