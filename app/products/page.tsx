import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/constants/products"

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
    {children}
  </span>
)

export default function ProductsPage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Our Products</h1>
        <p className="text-xl mb-8 text-center pt-2 pb-2">
          Explore our range of AI-powered tools that run entirely in your browser, ensuring your data stays private and secure.
        </p>
        <div className="flex flex-col lg:flex-row gap-8">
          {products.map((category) => (
            <section key={category.category} className="lg:flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold flex items-center">
                  <category.icon className="mr-2 h-6 w-6" />
                  {category.category}
                </h2>
                {category.comingSoon && <Badge>Coming Soon!</Badge>}
              </div>
              <div className="space-y-4">
                {category.items.map((product) => (
                  <Card key={product.name}>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{product.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full" disabled={category.comingSoon}>
                        <Link href={category.comingSoon ? "#" : product.action}>
                          {category.comingSoon ? "Coming Soon" : "Try Now"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}