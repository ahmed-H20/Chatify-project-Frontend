//     import { Clock, Plus, Search } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"
// import { ThemeToggle } from "@/components/theme-toggle"

// interface StatusUpdate {
//   id: string
//   name: string
//   time: string
//   avatar: string
// }

// interface StatusListProps {
//   myStatus: any[];          
//   otherStatus: any[];       
// }


// export default function StatusList({ statuses, myStatus }: StatusListProps) {
//   console.log("StatusList rendered with statuses:", statuses)
//   console.log("My Status:", myStatus)
//   return (
//     <div className="h-full flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
//       {/* Header */}
//       <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
//         <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Status</h2>
//         <div className="flex items-center gap-2">
//           <ThemeToggle />
//           <Button size="icon" variant="ghost" className="rounded-full text-gray-500 dark:text-gray-400">
//             <Plus className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="p-4 border-b border-gray-200 dark:border-gray-800">
//         <div className="relative">
//           <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
//           <Input
//             placeholder="Search"
//             className="pl-9 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
//           />
//         </div>
//       </div>

//       {/* My Status */}
//       <div className="p-4 border-b border-gray-200 dark:border-gray-800">
//         <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">My Status</h4>
//         <div className="flex items-center">
//           <div className="relative">
//             <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
//               <Clock className="h-6 w-6 text-gray-500 dark:text-gray-400" />
//             </div>
//             <div className="absolute bottom-0 right-0 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
//               <Plus className="h-3 w-3 text-white" />
//             </div>
//           </div>
//           <div className="ml-3">
//             <h3 className="font-medium text-sm text-gray-800 dark:text-white">My Status</h3>
//             <p className="text-xs text-gray-500 dark:text-gray-400">
//               {myStatus || "Tap to add status update"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Other Statuses */}
//       {statuses.length > 0 && (
//         <div className="flex-1 overflow-auto p-4 text-white">
//           <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recent Updates</h4>
//           {statuses.map((status, index) => (
//             <Link href={`/story/${status.id}`} key={index}>
//               <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer rounded-md flex items-center mb-2">
//                 <img
//                   src={status.avatar || "/Chatify_Logo.svg"}
//                   className="w-12 h-12 rounded-full object-cover"
//                   alt={status.name}
//                 />
//                 <div className="ml-3">
//                   <h3 className="font-medium text-sm text-gray-800 dark:text-white">{status.name}</h3>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">{status.time}</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

import { Clock, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

interface StatusUpdate {
  _id: string;
  caption: string;
  mediaUrl: string;
  createdAt: string;
  user?: any;
}

interface StatusListProps {
  myStatus: StatusUpdate[];
  otherStatus: StatusUpdate[];
}

export default function StatusList({ myStatus, otherStatus }: StatusListProps) {
  const lastMyStatus = myStatus[myStatus.length - 1]; // آخر حالة

  return (
    <div className="h-full flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Status</h2>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="icon" variant="ghost" className="rounded-full text-gray-500 dark:text-gray-400">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-9 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>

      {/* My Status */}
      <Link href="/story/me">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer rounded-md">
          <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">My Status</h4>
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-indigo-500 flex items-center justify-center overflow-hidden">
                {lastMyStatus?.mediaUrl ? (
                  <img
                    src={lastMyStatus.mediaUrl}
                    alt="My Status"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Clock className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                <Plus className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-sm text-gray-800 dark:text-white">My Status</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {lastMyStatus?.caption || "Tap to add status update"}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Other Statuses */}
      {otherStatus.length > 0 && (
        <div className="flex-1 overflow-auto p-4 text-white">
          <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recent Updates</h4>
          {otherStatus.map((status, index) => (
            <Link href={`/story/${status._id}`} key={index}>
              <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer rounded-md flex items-center mb-2">
                <div className="w-12 h-12 rounded-full border-2 border-green-500 overflow-hidden">
                  <img
                    src={status.mediaUrl || "/Chatify_Logo.svg"}
                    className="w-full h-full object-cover"
                    alt={status.caption}
                  />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-sm text-gray-800 dark:text-white">{status?.user?.name || "User"}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(status.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
