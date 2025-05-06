import StoryView from "@/components/story-view"

export default function StoryPage({ params }: { params: { id: string } }) {
  const story = {
    id: params.id,
    user: {
      id: "1",
      name: "Name",
      avatar: "/Chatify_Logo.svg?height=48&width=48",
    },
    content: "صلي علي النبي",
    timestamp: "5m ago",
  }

  return <StoryView story={story} />
}
