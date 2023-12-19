"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const form_schema = z.object({
  name: z.string().min(1, { message: 'A server name is required.'}),
  imageUrl: z.string().min(1, { message: 'A server image is required.' })
})

export const InitialModal = () => {

  const [is_mounted, set_is_mounted] = useState(false)

  useEffect(() => {
    set_is_mounted(true)
  }, [])

  const form = useForm({
    resolver: zodResolver(form_schema),
    defaultValues: {
      name: '',
      imageUrl: ''
    }
  })

  const is_loading = form.formState.isSubmitting

  const on_submit = async (values: z.infer<typeof form_schema>) => {
    console.log(values)
  }

  if (!is_mounted){
    return null
  }

  return (
    <Dialog open={true}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>Create Server</DialogTitle>
          <DialogDescription className='text-center text-slate-800'>Give your server some personality!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(on_submit)} className='space-y-8'>
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center text-center'>IMAGE UPLOAD</div>
            </div>
            <div className='px-6'>
              <FormField 
                control={form.control} 
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-xs font-bold text-slate-500 dark:text-secondary/70'>Server name</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={is_loading}
                        className='bg-slate-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                        placeholder='Enter server name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className='bg-slate-100 px-6 py-4'>
              <Button disabled={is_loading} variant='primary'>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}