import SettingsList from "@/components/settings-list"
import Logo from "@/components/logo"
import ProfileForm from "@/components/profile-form"

export default function SettingsPage() {
  return (
    <div className="flex h-full">
      <div className="w-full md:w-96 h-full">
        <SettingsList />
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center">
        <ProfileForm />
    </div>
    </div>
  )
}
