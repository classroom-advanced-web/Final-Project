import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { requestReviewSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import { GradeBoard } from '@/type';
import gradeApi from '@/api/gradeApi';
import { useNavigate, useParams } from 'react-router-dom';
import { stompClient } from '../header/Notifications';
import { useAuth } from '@/hooks/useAuth';
import usePeople from '@/hooks/usePeople';
import { ROLE } from '@/constance/constance';

type Props = {
  gradeBoard: GradeBoard | undefined;
  compisitionName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function GradeForm({ open, onOpenChange, compisitionName, gradeBoard }: Props) {
  const { user } = useAuth();
  const { people } = usePeople();

  const form = useForm<z.infer<typeof requestReviewSchema>>({
    resolver: zodResolver(requestReviewSchema),
    defaultValues: {
      explanationMessage: ''
    }
  });
  const navigate = useNavigate();

  const classId = useParams<{ id: string | undefined }>().id;

  if (!user || !people) return null;

  const handleShowRequest = (gradeId: string) => {
    navigate(`/grades-review/${classId}/${gradeId}`);
  };

  const handleSubmit = async (data: z.infer<typeof requestReviewSchema>) => {
    onOpenChange(false);

    try {
      const res = await gradeApi.requestReview(
        'Expected score: ' + data.expectationGrade + '\n' + 'Explanation: ' + data.explanationMessage,

        gradeBoard?.id!
      );

      if (res) {
        const owner = people.find((person) => person.role.code === ROLE.OWNER);

        stompClient &&
          stompClient.send(
            '/app/notifications',
            {},
            JSON.stringify({
              sender_id: user?.id,
              classroom_id: classId,
              receiver_id: owner?.user.id,
              title: 'Request a review',
              content: gradeBoard?.id
            })
          );
      }
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a review: {compisitionName}</DialogTitle>
        </DialogHeader>
        {/* content */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='expectationGrade'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>expectation grade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='0'
                      {...field}
                      className={cn(
                        form.formState.errors.expectationGrade && 'border-red-400 focus-visible:ring-red-400',
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
              name='explanationMessage'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>explanation message</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='explanation message'
                      {...field}
                      className={cn(
                        form.formState.errors.explanationMessage && 'border-red-400 focus-visible:ring-red-400',
                        'pr-8'
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='button' variant='ghost' onClick={() => handleShowRequest(gradeBoard?.id ?? '')}>
              Show Request
            </Button>
            <Button type='submit' disabled={form.formState.isLoading}>
              Send
            </Button>
          </form>
        </Form>

        {/* content */}
      </DialogContent>
    </Dialog>
  );
}

export default GradeForm;
