import SettingsList from "@/components/settings-list"
import Logo from "@/components/logo"
import ProfileForm from "@/components/profile-form"
import ChangePasswordPage from "@/components/changePass"

export default function SettingsPage() {
  return (
    <div className="flex h-full">
      <div className="w-full md:w-96 h-full">
        <SettingsList />
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center">
        <ChangePasswordPage />
    </div>
    </div>
  )
}
