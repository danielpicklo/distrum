"use client"

import { X } from "lucide-react"
import Image from "next/image"

import { UploadButton, UploadDropzone } from "@/lib/uploadthing"

import '@uploadthing/react/styles.css'
import { Sriracha } from "next/font/google"

interface FileUploadProps {
  onChange: (url?: string) => void
  value: string
  endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({
  onChange,
  value,
  endpoint
}: FileUploadProps) => {

  const fileType = value?.split('.').pop()

  if(value && fileType !== 'pdf'){
    return (
      <div className='relative h-50 w-50'>
        <Image
          fill
          src={value}
          alt='upload'
          className='rounded-full relative relative-important upload-image'
        />
        <button 
          onClick={() => onChange('')}
          className='bg-rose-300 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
          type='button'
        >
          <X className='h-4 w-4'/>
        </button>
      </div>
    )
  }

  return ( 
    <UploadDropzone 
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.error(error)
      }}
    />
   );
}