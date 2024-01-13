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
import { useAuth } from '@/hooks/useAuth';
import Loading from '../loading/Loading';
import { stompClient } from '../header/Notifications';

type Props = {
  setItems: any;
  items: any[];
  closeForm: any;
};

const CompositionForm = ({ setItems, items, closeForm }: Props) => {
  const { id: classroomId } = useParams();
  const { user, loading } = useAuth();

  const navigate = useNavigate();
  if (!classroomId) navigate('/');

  const onSubmit = async (data: z.infer<typeof gradesStructureSchema>) => {
    try {
      const res = await classApi.createComposition(data.compositionName, data.scale, classroomId!);
      if (res) {
        toast({
          title: 'Create Grade Structure successfully'
        });
        setItems([...items, res]);

        stompClient &&
          stompClient.send(
            '/app/notifications',
            {},
            JSON.stringify({
              sender_id: user?.id,
              classroom_id: classroomId,
              title: 'New Grade Structure',
              content: 'New Grade Structure has been created'
            })
          );
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

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

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
                <FormLabel>Composition name:</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Composition name (required)'
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
                    placeholder='Scale (required)'
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

export default CompositionForm;
