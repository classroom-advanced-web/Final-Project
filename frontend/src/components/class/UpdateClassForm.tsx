import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { updateClassSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';

import classApi from '@/api/classApi';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useQueryClient } from 'react-query';
import { useState } from 'react';

type Props = {
  classroom: Classroom;
};

const UpdateClassForm = ({ classroom }: Props) => {
  const [error, setError] = useState('');
  const form = useForm<z.infer<typeof updateClassSchema>>({
    resolver: zodResolver(updateClassSchema),
    defaultValues: {
      className: classroom.name ?? '',
      description: classroom.description ?? '',
      section: classroom.section ?? '',
      subject: classroom.subject ?? '',
      room: classroom.room ?? ''
    }
  });

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const onSubmit = async (data: z.infer<typeof updateClassSchema>) => {
    try {
      const res = await classApi.updateClass({
        ...data,
        classId: classroom.id
      });
      if (res) {
        toast({
          title: 'Update class successfully'
        });

        queryClient.invalidateQueries(['class', classroom.id]);
      }
    } catch (error: any) {
      if (error?.response) {
        setError(error.response.data.error);
      }
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='className'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class name:</FormLabel>
              <FormControl>
                <Input
                  placeholder='Class name (required)'
                  {...field}
                  className={cn(form.formState.errors.className && 'border-red-400 focus-visible:ring-red-400', 'pr-8')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='Description'
                    {...field}
                    className={cn(
                      form.formState.errors.description && 'border-red-400 focus-visible:ring-red-400',
                      'pr-8'
                    )}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='section'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section:</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='Section'
                    {...field}
                    className={cn(form.formState.errors.section && 'border-red-400 focus-visible:ring-red-400', 'pr-8')}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='subject'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject:</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='Subject'
                    {...field}
                    className={cn(form.formState.errors.subject && 'border-red-400 focus-visible:ring-red-400', 'pr-8')}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='room'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room:</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='Room'
                    {...field}
                    className={cn(form.formState.errors.room && 'border-red-400 focus-visible:ring-red-400', 'pr-8')}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <span className='text-red-500'>{error}</span>}
        <Button type='submit' className='ml-auto block w-full lg:w-max' disabled={form.formState.isLoading}>
          Save
        </Button>
      </form>
    </Form>
  );
};
export default UpdateClassForm;
