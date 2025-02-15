import { ToolCard } from "@/components/LaunchCard"
import { products } from "@/constants/products"

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">AI Tools</h1>
      <div className="space-y-6">
        {products.map((product) => (
          <ToolCard
            key={product.name}
            icon={product.icon as "Image" | "Music" | "Video" | "Languages"}
            name={product.name}
            description={product.description}
            action={product.action}
          />
        ))}
      </div>
    </main>
  </div>
  )
}