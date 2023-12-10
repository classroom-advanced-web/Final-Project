import classApi from '@/api/classApi';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ROLE } from '@/constance/constance';
import { cn } from '@/lib/utils';
import { joinClassSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const JoinClassForm = ({ open, onOpenChange }: Props) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof joinClassSchema>>({
    resolver: zodResolver(joinClassSchema),
    defaultValues: {
      code: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof joinClassSchema>) => {
    try {
      const res = await classApi.joinClass(data.code, ROLE.STUDENT);
      onOpenChange(false);
      navigate(`/class/${res.class_id}`);
      console.log(res);
    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            {error && <span className='text-sm text-red-600'>{error}</span>}

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
