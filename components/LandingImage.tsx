import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context/ImageContext'
import { Upload } from 'lucide-react'
import ImageOverlay from '@/components/ImageOverlay'

export default function LandingImage() {
  const { setOriginalImage } = useAppContext()
  const [dragActive, setDragActive] = useState(false)
  const router = useRouter()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      //save the image to session storage 
      sessionStorage.setItem('image', reader.result as string)
      setOriginalImage(reader.result as string)
      router.push('/remove')
    }
    reader.readAsDataURL(file)
  }

  return (
        <div className="flex flex-col md:flex-row min-h-[80vh] justify-center ">
          <div className="flex-1 p-8 lg:px-4 md:p-16 md:pt-0 flex flex-col justify-center max-w-2xl h-4/5">
            <div className="lg:px-14">
              <ImageOverlay originalSrc={'assets/landing.png'} processedSrc={'assets/landing.jpg'} alt={'Image'} />
              <h1 className="text-4xl font-bold mb-4">
                Private<br />
                background remover
              </h1>
              <p className="text-gray-600 mb-8">
                Transform images instantly with on-device AI.
                <br /> Everything happens in your browser.
                <br /> Always free.
                <br /> Completely private.
              </p>
              <div className="lg:hidden">
                <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                  <Upload className="mr-2 h-5 w-5" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className={`hidden lg:flex flex-1 p-8 lg:px-4 md:p-16 md:pt-1 justify-center max-w-2xl `}>
            <div className={`border-2 border-dashed rounded-lg flex items-center justify-center h-4/5 w-4/5 ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            >

              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Drop your picture here</p>
                <p className="mt-1 text-xs text-gray-500">or</p>
                <label className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer">
                  <span>Upload image</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleChange}
                    />
                </label>
              </div>
            </div>
          </div>
        </div>
  )
}