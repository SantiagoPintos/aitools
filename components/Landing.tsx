import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Lock, Globe } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI Tools That Respect Your Privacy
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Powerful AI capabilities running entirely in your browser. No data sent to our servers. Your information stays with you.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Cpu className="h-8 w-8 mb-2" />
                  <CardTitle>Browser-Based Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  All AI computations happen right in your browser, ensuring your data never leaves your device.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-8 w-8 mb-2" />
                  <CardTitle>End-to-End Encryption</CardTitle>
                </CardHeader>
                <CardContent>
                  Your data is encrypted at all times, even when it's being processed by our AI tools.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Globe className="h-8 w-8 mb-2" />
                  <CardTitle>Offline Capability</CardTitle>
                </CardHeader>
                <CardContent>
                  Once loaded, our tools can work offline, giving you the freedom to work anywhere, anytime.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container max-w-full px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">1. Load the Tool</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Select the AI tool you need from our suite of privacy-focused applications.
                </p>
                <h3 className="text-2xl font-bold">2. Process Locally</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  The AI model runs entirely in your browser, using your device's processing power.
                </p>
                <h3 className="text-2xl font-bold">3. Get Results</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive your AI-processed results without any data ever leaving your device.
                </p>
              </div>
              <div className="lg:order-first">
                <img
                  alt="Browser-based AI processing"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center w-full"
                  height="310"
                  src="/placeholder.svg?height=310&width=550"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Experience Secure AI?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Try our privacy-focused AI tools today and see the difference of local, secure processing.
                </p>
              </div>
              <Button size="lg">Get Started Now</Button>
            </div>
          </div>
        </section>
      </main>
  </div>
  )
}