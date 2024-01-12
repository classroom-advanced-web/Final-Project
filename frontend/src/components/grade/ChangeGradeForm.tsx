import classApi from '@/api/classApi';
import gradeApi from '@/api/gradeApi';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { changeGradeSchema } from '@/schema/formSchema';
import { DefaultGrade } from '@/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import * as z from 'zod';

type Props = {
  defaultGradeInfor: DefaultGrade;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ChangeGradeForm = ({ open, onOpenChange, defaultGradeInfor }: Props) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState('');
  const { id } = useParams();

  if (!id) <Navigate to='/' />;

  const form = useForm<z.infer<typeof changeGradeSchema>>({
    resolver: zodResolver(changeGradeSchema),
    defaultValues: {
      grade: defaultGradeInfor.defaultGrade
    }
  });

  const onSubmit = async (data: z.infer<typeof changeGradeSchema>) => {
    try {
      const res = await gradeApi.changeGrade(data.grade, defaultGradeInfor.studentId, defaultGradeInfor.compositionId);
      onOpenChange(false);

      if (res) {
        queryClient.invalidateQueries('gradeBoard');
      }
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
              <DialogTitle>Change Grade: {defaultGradeInfor.compositionName}</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name='grade'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Class code'
                      {...field}
                      className={cn(form.formState.errors.grade && 'border-red-400 focus-visible:ring-red-400', 'pr-8')}
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
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default ChangeGradeForm;
