import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <header className="flex h-16 md:h-24 w-full items-center">
      <div className="mx-auto max-w-7xl flex w-full items-center px-4 md:px-10">
        <Link href="/" className="mr-6 flex items-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Background remover</span>
        </Link>
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href="/remove"
            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            Get Started
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="grid gap-6 p-6">
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                  Home
                </Link>
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                  About
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}