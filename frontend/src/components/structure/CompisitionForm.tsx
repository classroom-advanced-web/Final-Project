import classApi from '@/api/classApi';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { gradesStructureSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as z from 'zod';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

type Props = {
  setItems: any;
  items: any[];
  closeForm: any;
};

const CompisitionForm = ({ setItems, items, closeForm }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) navigate('/');

  const onSubmit = async (data: z.infer<typeof gradesStructureSchema>) => {
    try {
      const res = await classApi.createComposition(data.compositionName, data.scale, id!);
      if (res) {
        toast({
          title: 'Create class successfully'
        });
        setItems([...items, res]);
        closeForm();
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
      <h2 className='text-2xl font-bold'>Create</h2>

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
                    placeholder='Grade name (required)'
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
                <FormLabel>Scale</FormLabel>
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

          <Button type='button' variant='ghost' onClick={closeForm}>
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
