import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { ChannelType, MemberRole } from "@prisma/client"
import { ServerHeader } from "./server-header"
import { ScrollArea } from "../ui/scroll-area"
import { ServerSearch } from "./server-search"
import { 
  AudioLines, 
  Computer, 
  Hash, 
  ShieldCheck, 
  ShieldHalf, 
  User, 
  Video 
} from "lucide-react"

interface ChannelSidebarProps {
  serverId: string
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className='mr-2 h-4 2-4' />,
  [ChannelType.VIDEO]: <Video className='mr-2 h-4 2-4' />,
  [ChannelType.AUDIO]: <AudioLines className='mr-2 h-4 2-4' />,
  [ChannelType.AI]: <Computer className='mr-2 h-4 2-4' />
}

const roleIconMap = {
  [MemberRole.GUEST]: <User className='mr-2 h-4 2-4 text-black' />,
  [MemberRole.MODERATOR]: <ShieldCheck className='mr-2 h-4 2-4 text-green-500' />,
  [MemberRole.ADMIN]: <ShieldHalf className='mr-2 h-4 2-4 text-red-500' />
}

export const ChannelSidebar = async ({
  serverId
}: ChannelSidebarProps) => {

  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc'
        }
      },
      members: {
        include: {
          profile: true
        },
        orderBy: {
          role: 'asc'
        }
      }
    }
  })

  const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
  const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
  const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
  const aiChannels = server?.channels.filter((channel) => channel.type === ChannelType.AI)

  //const members = server?.members.filter((member) => member.profileId !== profile.id)
  const members = server?.members

  if (!server) {
    return redirect('/')
  }

  const role = server.members.find((member) => member.profileId === profile.id)?.role

  return (
    <div className='flex flex-col h-full text-primary w-full bg-slate-200 dark:bg-[#2b2d31]'>
      <ServerHeader 
        server={server}
        role={role}
      />
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <ServerSearch 
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: 'Audio Channels',
                type: 'channel',
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: 'Video Channels',
                type: 'channel',
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: 'AI Channels',
                type: 'channel',
                data: aiChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: 'Members',
                type: 'member',
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role]
                }))
              }
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  )
}