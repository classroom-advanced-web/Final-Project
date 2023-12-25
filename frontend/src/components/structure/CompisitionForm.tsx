import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { gradesStructureSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import classApi from '@/api/classApi';
import { toast } from '../ui/use-toast';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  setItems: any;
  items: any[];
};

const CompisitionForm = ({ setItems, items }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) navigate('/');

  const onSubmit = async (data: z.infer<typeof gradesStructureSchema>) => {
    setItems([...items, data.compositionName]);
    try {
      const res = await classApi.createComposition(data.compositionName, data.scale, id!);
      if (res) {
        toast({
          title: 'Create class successfully'
        });
        //form.reset();
        //onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm<z.infer<typeof gradesStructureSchema>>({
    resolver: zodResolver(gradesStructureSchema),
    defaultValues: {
      compositionName: '',
      scale: 0
    }
  });
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='compositionName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade name:</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Class name (required)'
                    {...field}
                    className={cn(
                      form.formState.errors.compositionName && 'border-red-400 focus-visible:ring-red-400',
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
            name='scale'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Class name (required)'
                    {...field}
                    className={cn(form.formState.errors.scale && 'border-red-400 focus-visible:ring-red-400', 'pr-8')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='button' variant='ghost' disabled={form.formState.isLoading}>
            Close
          </Button>
          <Button type='submit' disabled={form.formState.isLoading}>
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CompisitionForm;
