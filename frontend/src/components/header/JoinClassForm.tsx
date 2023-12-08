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
import { joinClassSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type Props = {
  children?: React.ReactNode;
};

const JoinClassForm = ({ children }: Props) => {
  const form = useForm<z.infer<typeof joinClassSchema>>({
    resolver: zodResolver(joinClassSchema),
    defaultValues: {
      code: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof joinClassSchema>) => {
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
            <DialogDescription>
              <h2>Ask your teacher for the class code, then enter it here.</h2>
            </DialogDescription>
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Class code'
                      {...field}
                      className={cn(form.formState.errors.code && 'border-red-400 focus-visible:ring-red-400', 'pr-8')}
                    />
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
              <Button type='submit'>Join</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default JoinClassForm;
