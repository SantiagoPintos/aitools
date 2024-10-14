import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Lock, Globe, Check } from "lucide-react"
import { Link } from "next-view-transitions"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
                  AI tools that respect your privacy
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 p-2">
                  Powerful AI capabilities running entirely in your browser. No data sent to our servers. Your information stays with you.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href={"/products"}>
                    Get Started
                  </Link>
                </Button>
                <Button variant="outline">
                  <Link href={"/how-it-works"}>
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Cpu className="h-8 w-8 mb-2" />
                  <CardTitle>Browser-based processing</CardTitle>
                </CardHeader>
                <CardContent>
                  All AI computations happen right in your browser, ensuring your data never leaves your device.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-8 w-8 mb-2" />
                  <CardTitle>End-to-End encryption</CardTitle>
                </CardHeader>
                <CardContent>
                  Your data is encrypted at all times, even when it's being processed by our AI tools.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Globe className="h-8 w-8 mb-2" />
                  <CardTitle>Offline capability</CardTitle>
                </CardHeader>
                <CardContent>
                  Once loaded, our tools can work offline, giving you the freedom to work anywhere, anytime.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 md:mb-12">Pricing</h2>
            <div className="max-w-3xl mx-auto">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-center">$0</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-semibold mb-4">Local AI</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center justify-center">
                      <Check className="mr-2 h-4 w-4" />
                      <span>All AI tools included</span>
                    </li>
                    <li className="flex items-center justify-center">
                      <Check className="mr-2 h-4 w-4" />
                      <span>Unlimited usage</span>
                    </li>
                    <li className="flex items-center justify-center">
                      <Check className="mr-2 h-4 w-4" />
                      <span>No credit card required</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Our tools are completely free because we use open-source AI models and all processing occurs in your browser. We believe in democratizing AI while prioritizing your privacy.
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <Link href={"/products"}>
                      Get Started Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to experience secure AI?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Try our privacy-focused AI tools today and see the difference of local, secure processing.
                </p>
              </div>
              <Button asChild size="lg">
                  <Link href={"/products"}>
                    Get Started Now
                  </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
  </div>
  )
}