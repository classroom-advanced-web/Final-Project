import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { createClassSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type Props = {
  children?: React.ReactNode;
};

const CreateClassForm = ({ children }: Props) => {
  const form = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      className: '',
      section: '',
      subject: '',
      room: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof createClassSchema>) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>{children}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Create class</DialogTitle>
            </DialogHeader>
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
            />
            {/* {error && <div className='text-red-500'>{error}</div>} */}
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='ghost'>
                  Close
                </Button>
              </DialogClose>
              <Button type='submit'>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateClassForm;
