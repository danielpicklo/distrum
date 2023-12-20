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
import { FileUpload } from "../file-upload"

const form_schema = z.object({
  name: z.string().min(1, { message: 'A server name is required.'}),
  imageUrl: z.string().min(1, { message: 'A server image is required.' })
})

export const InitialModal = () => {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm({
    resolver: zodResolver(form_schema),
    defaultValues: {
      name: '',
      imageUrl: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof form_schema>) => {
    console.log(values)
  }

  if (!isMounted){
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
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center text-center'>
                
                <FormField 
                  control={form.control}
                  name="imageUrl"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

              </div>
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
                        disabled={isLoading}
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
              <Button disabled={isLoading} variant='primary'>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}