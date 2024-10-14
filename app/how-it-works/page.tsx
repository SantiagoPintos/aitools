import Link from "next/link"
import { ShieldCheck, Cpu, Lock, Wifi, Server } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorks() {
  const steps = [
    {
      icon: Cpu,
      title: "Browser-Based Processing",
      description: "All AI computations occur directly in your web browser, leveraging your device's processing power."
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "Your data never leaves your device. All processing is done locally, ensuring complete privacy."
    },
    {
      icon: Wifi,
      title: "Offline Capability",
      description: "Once loaded, our tools can function without an internet connection, giving you flexibility and additional privacy."
    },
    {
      icon: Server,
      title: "No Server Interaction",
      description: "We don't use servers for processing your data. This means there's no risk of data interception or unauthorized access."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">How It Works</h1>
        <p className="text-xl mb-8">
          Our AI tools are designed with your privacy and security in mind. Here's how we ensure your data stays safe while providing powerful AI capabilities:
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <step.icon className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">The Process</h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>Load the Tool:</strong> When you access one of our AI tools, the necessary models and algorithms are downloaded to your browser.
            </li>
            <li>
              <strong>Input Your Data:</strong> You provide the data you want to process (e.g., an image, audio file, or video).
            </li>
            <li>
              <strong>Local Processing:</strong> Your browser uses the downloaded models to process your data locally on your device.
            </li>
            <li>
              <strong>View Results:</strong> The results are displayed directly in your browser, without any data ever leaving your device.
            </li>
            <li>
              <strong>Data Cleared:</strong> Once you close the browser tab or navigate away, all processed data is cleared from your device's memory.
            </li>
          </ol>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Enhanced privacy and security as your data never leaves your device</li>
            <li>Faster processing times due to elimination of server communication</li>
            <li>Ability to use tools offline after initial load</li>
            <li>Reduced risk of data breaches or unauthorized access</li>
            <li>Compliance with strict data protection regulations</li>
          </ul>
        </section>
      </main>
    </div>
  )
}