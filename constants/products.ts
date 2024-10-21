import { Image, Music, Video } from "lucide-react"

export const products = [
    {
      category: "Image",
      icon: Image,
      items: [
        {
          name: "Background remover",
          description: "Remove image backgrounds instantly with our fine-tuned AI model.",
          action: "/products/background-remover"
        }
      ],
      comingSoon: false
    },
    {
      category: "Audio",
      icon: Music,
      items: [
        {
          name: "Audio Transcriber",
          description: "Transcribe audio to text with high accuracy using our privacy-focused AI model.",
          action: "/products/audio-transcriber"
        }
      ],
      comingSoon: false
    },
    {
      category: "Video",
      icon: Video,
      items: [
        {
          name: "Video Summarizer",
          description: "Generate concise summaries of video content using cutting-edge AI technology.",
          action: "/products/video-summarizer"
        }
      ],
      comingSoon: true
    }
]