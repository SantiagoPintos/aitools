import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <nav className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-xl font-bold">PRIVATEIA</span>
            </Link>
          </div>
          <div className="flex items-center">
          <Link href="#features" passHref>
              <Button variant="ghost" className="ml-4">
                Features
              </Button>
            </Link>
            <Link href="#pricing" passHref>
              <Button variant="ghost" className="ml-4">
                Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
