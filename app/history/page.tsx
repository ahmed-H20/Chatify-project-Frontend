import StatusList from "@/components/status-list"
import Logo from "@/components/logo"

export default function HistoryPage() {
  const statuses = [
    {
      id: "1",
      name: "Name",
      time: "Just now",
      avatar: "/Chatify_Logo.svg?height=48&width=48",
    },
    {
      id: "2",
      name: "Name",
      time: "1h ago",
      avatar: "/Chatify_Logo.svg?height=48&width=48",
    },
    {
      id: "3",
      name: "Name",
      time: "4h ago",
      avatar: "/Chatify_Logo.svg?height=48&width=48",
    },
    {
      id: "4",
      name: "Name",
      time: "10h ago",
      avatar: "/Chatify_Logo.svg?height=48&width=48",
    },
  ]

  return (
    <div className="flex h-full">
      <div className="w-full md:w-96 h-full">
        <StatusList statuses={statuses} />
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center">
        <Logo />
      </div>
    </div>
  )
}
