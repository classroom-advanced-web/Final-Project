import { inviteSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import classApi from '@/api/classApi';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Navigate, useParams } from 'react-router-dom';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inviteLink?: string;
  desc?: string;
  roleId: number;
};

const InviteModal = ({ open, onOpenChange, desc = '', roleId }: Props) => {
  const form = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: ''
    }
  });

  const { toast } = useToast();

  const { id: classroomId } = useParams();

  if (!classroomId) {
    return <Navigate to='/' />;
  }

  const onSubmit = async (data: z.infer<typeof inviteSchema>) => {
    try {
      const { email } = data;
      const res = await classApi.inviteMember(+classroomId, email, roleId);
      if (res) {
        toast({
          title: 'Invited'
        });
      }
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Invite teacher</DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Type a email'
                      {...field}
                      className={cn(form.formState.errors.email && 'border-red-400 focus-visible:ring-red-400', 'pr-8')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='border-t-[1px] py-4'>{desc}</div>
            {/* {error && <div className='text-red-500'>{error}</div>} */}
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='ghost' disabled={form.formState.isLoading}>
                  Close
                </Button>
              </DialogClose>
              <Button type='submit' disabled={form.formState.isLoading}>
                Invite
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default InviteModal;
