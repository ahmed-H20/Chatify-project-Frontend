import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Contact Us</h1>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input id="name" placeholder="Your name" className="bg-gray-50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" className="bg-gray-50 border-gray-200" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                Subject
              </label>
              <Input id="subject" placeholder="Subject" className="bg-gray-50 border-gray-200" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message
              </label>
              <Textarea id="message" placeholder="Your message" rows={6} className="bg-gray-50 border-gray-200" />
            </div>

            <Button type="submit" className="w-full bg-indigo-700 hover:bg-indigo-800 text-white">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
