"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Image, Languages, Video, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const iconMap = {
  Image,
  Music,
  Languages,
  Video,
}

interface ToolCardProps {
  name: string
  description: string
  icon: keyof typeof iconMap
  action: string
}

export function ToolCard({ name, description, icon, action }: ToolCardProps) {
  const Icon = iconMap[icon]
  const router = useRouter();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 rounded-full bg-gray-100 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <span>{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-base">{description}</CardDescription>
        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
          onClick={() => router.push(action)}
        >
          Launch Tool
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

