"use client"

import qs from "query-string"
import { ServerWithMembersWithProfiles } from "@/types"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../ui/dialog"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "../ui/dropdown-menu"
import { useModal } from "@/hooks/use-modal-store"
import { ScrollArea } from "../ui/scroll-area"
import { UserAvatar } from "../user-avatar"
import { 
  ShieldCheck, 
  ShieldHalf, 
  User2,
  MoreVertical, 
  ShieldQuestion,
  Shield,
  Check,
  Gavel,
  Loader2
} from "lucide-react"
import { useState } from "react"
import { MemberRole } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"

const roleIconMap = {
  "GUEST": <User2 className='h-4 w-4 ml-2' />,
  "MODERATOR": <ShieldCheck className='h-4 w-4 ml-2 text-green-500' />,
  "ADMIN": <ShieldHalf className='h-4 w-4 ml-2 text-red-500' />
}

export const MembersModal = () => {

  const router = useRouter()
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const [loadingId, setLoadingId] = useState('')

  const isModalOpen = isOpen && type === 'members'
  const { server } = data as { server: ServerWithMembersWithProfiles }

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id
        }
      })

      const response = await axios.delete(url)

      router.refresh()
      onOpen('members', {server: response.data})

    } catch (error) {
      console.log(error)
    } finally {
      setLoadingId('')
    }
  }

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id
        }
      })

      const response = await axios.patch(url, { role })

      router.refresh()
      onOpen('members', {server: response.data})

    } catch (error) {
      console.log(error)
    } finally{
      setLoadingId('')
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>Manage Members</DialogTitle>
          <DialogDescription className='text-center text-slate-800'>
            {server?.members?.length} members are active on this server.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='md-8 max-h-[420px] pr-6'>
          {server?.members?.map((member) =>  (
            <div key={member.id} className='flex items-center gap-x-2 mb-6'>
              <UserAvatar src={member.profile.imageUrl} />
              <div className='flex flex-col gap-y-1'>
                <div className='text-xs font-semibold flex items-center gap-x-1'>
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className='text-xs text-slate-500'>{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId && loadingId !== member.id && (
                <div className='ml-auto text-sm'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className='h-4 w-4 text-black' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side='left'>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger
                          className='flex items-center cursor-pointer'
                        >
                          <ShieldQuestion className='w-4 h-4 mr-2' />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() => onRoleChange(member.id, 'GUEST')}
                              className='cursor-pointer'
                            >
                              <Shield className='w-4 h-4 mr-2' />
                              Guest
                              {member.role === 'GUEST' && (
                                <Check className='w-4 h-4 ml-auto' />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onRoleChange(member.id, 'MODERATOR')}
                              className='cursor-pointer'
                            >
                              <ShieldCheck className='w-4 h-4 mr-2' />
                              Moderator
                              {member.role === 'MODERATOR' && (
                                <Check className='w-4 h-4 ml-auto' />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onKick(member.id)}
                        className='text-red-500 cursor-pointer'
                      >
                        <Gavel className='w-4 h-4 mr-2' />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {loadingId === member.id && (
                <Loader2 className='animate-spin text-slate-500 w-4 h-4 ml-auto' />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}