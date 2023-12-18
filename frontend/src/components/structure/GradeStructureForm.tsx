import classApi from '@/api/classApi';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { createClassSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';

import React, { useState } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import SortableTable from '../sortable/SortableTable';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GradeStructureForm = ({ open, onOpenChange }: Props) => {
  const [items, setItems] = useState<any[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);
  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newArr = arrayMove(items, oldIndex, newIndex);
    setItems(newArr);
  };
  const form = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      className: '',
      section: '',
      subject: '',
      room: ''
    }
  });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof createClassSchema>) => {
    try {
      const res = await classApi.createClass(data);
      if (res) {
        toast({
          title: 'Create class successfully'
        });
        form.reset();
        onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='container inset-0 flex w-screen max-w-none translate-x-0 translate-y-0 flex-col overflow-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Create class</DialogTitle>
            </DialogHeader>
            <SortableTable items={items} onSortEnd={onSortEnd} />
            {/* <FormField
              control={form.control}
              name='className'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class name:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Class name (required)'
                      {...field}
                      className={cn(
                        form.formState.errors.className && 'border-red-400 focus-visible:ring-red-400',
                        'pr-8'
                      )}
                    />
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
                        className={cn(
                          form.formState.errors.section && 'border-red-400 focus-visible:ring-red-400',
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
              name='subject'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject:</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        placeholder='Subject'
                        {...field}
                        className={cn(
                          form.formState.errors.subject && 'border-red-400 focus-visible:ring-red-400',
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
              name='room'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room:</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        placeholder='Room'
                        {...field}
                        className={cn(
                          form.formState.errors.room && 'border-red-400 focus-visible:ring-red-400',
                          'pr-8'
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* {error && <div className='text-red-500'>{error}</div>} */}
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='ghost' disabled={form.formState.isLoading}>
                  Close
                </Button>
              </DialogClose>
              <Button type='submit' disabled={form.formState.isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default GradeStructureForm;
