import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import classApi from '@/api/classApi';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { requestReviewSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as z from 'zod';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

type Props = {
  compisitionName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function GradeForm({ open, onOpenChange, compisitionName }: Props) {
  const form = useForm<z.infer<typeof requestReviewSchema>>({
    resolver: zodResolver(requestReviewSchema),
    defaultValues: {
      explanationMessage: ''
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a review: {compisitionName}</DialogTitle>
        </DialogHeader>
        {/* content */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className='space-y-8'>
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

            <Button type='button' variant='ghost' onClick={() => {}}>
              Close
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
