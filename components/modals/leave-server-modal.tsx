"use client"

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Button } from "../ui/button"
import { MessageCircleWarning } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export const LeaveServerModal = () => {

  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'leaveServer'
  const { server } = data

  const [isLoading, setIsLoading] = useState(false)

  const onLeave = async () => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/servers/${server?.id}/leave`)
      onClose()
      router.refresh()
      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl font-bold flex flex-row justify-center gap-4 items-center'>
            <MessageCircleWarning className='text-red-500' /> 
            <span>Leave this server?</span>
          </DialogTitle>
          <DialogDescription className='text-center text-slate-800 pt-4'>
            You are about to leave <span className='font-bold'>{server?.name}</span>. 
            You will need to be invited back to join again!</DialogDescription>
        </DialogHeader>
        <DialogFooter
          className='bg-gray-100 px-6 py-4'
        >
          <div className='flex items-center justify-between w-full'>
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant='ghost'
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onLeave}
              variant='destructive'
            >
              Leave
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}