"use client"

import { Plus } from "lucide-react"
import { ActionTooltip } from "../action-tooltip"

export const NavigationAction = () => {
  return (
    <ActionTooltip
      side='right'
      align='center'
      label='Add a server'
    >
      <div>
        <button
          className='group flex items-center'
        >
          <div 
            className='flex mx-3 h-[48px] w-[48px] rounded-[16px] group-hover:rounded-[8px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-red-400'
          >
            <Plus 
              className='group-hover:text-white transition text-red-400'
              size={25}
            />
          </div>
        </button>
      </div>
    </ActionTooltip>
  )
}