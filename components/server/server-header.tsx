"use client"

import { ServerWithMembersWithProfiles } from "@/types"
import { MemberRole } from "@prisma/client"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu"
import { BombIcon, ChevronDown, Cog, Delete, Plus, UserMinus2, UserPlus2, Users2 } from "lucide-react"
import { useModal } from "@/hooks/use-modal-store"

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles
  role?: MemberRole
}

export const ServerHeader = ({
  server,
  role
}: ServerHeaderProps) => {

  const { onOpen } = useModal()

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='focus:outline-none'
        asChild
      >
        <button
          className='w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-slate-700/10 dark:hover:bg-slate-700/50 transition'
        >
          {server.name}
          <ChevronDown 
            className='h-5 w-5 ml-auto'
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56 text-xs font-medium text-black dark:text-white space-y-[2px]'
      >
        {isModerator && (
          <DropdownMenuItem
            onClick={ () => onOpen('invite', { server }) }
            className='text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer'
          >
            Invite Members
            <UserPlus2 className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('editServer', { server })}
            className='px-3 py-2 text-sm cursor-pointer'
          >
            Server Settings
            <Cog className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('members', { server })}
            className='px-3 py-2 text-sm cursor-pointer'
          >
            Manage Users
            <Users2 className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            className='px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen('createChannel', { server })}
          >
            Create Channel
            <Plus className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuSeparator />
        )}
        {isAdmin && (
          <DropdownMenuItem
            className='text-red-500 px-3 py-2 text-sm cursor-pointer'
          >
            Delete Server
            <BombIcon className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className='text-red-500 px-3 py-2 text-sm cursor-pointer'
          >
            Leave Server
            <UserMinus2 className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>

    </DropdownMenu>
  )
}