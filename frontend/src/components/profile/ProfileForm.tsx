/* eslint-disable @typescript-eslint/no-explicit-any */
import profileApi from '@/api/profileApi';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn, formatDate } from '@/lib/utils';
import { ProfileSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

type Props = {
  user: any;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileForm = ({ setIsEditMode, user }: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: formatDate(user.dob),
      gender: user.gender
    }
  });

  const onSubmit = async (data: z.infer<typeof ProfileSchema>) => {
    setLoading(true);
    try {
      const { birthday, firstName, gender, lastName } = data;
      const res = await profileApi.updateProfile({
        id: user.id,
        birthday: new Date(birthday),
        firstName,
        gender,
        lastName
      });
      console.log(res);

      setIsEditMode(false);
      window.location.href = '/profile';
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-2 gap-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name:</FormLabel>

                <FormControl>
                  <Input
                    placeholder={user.firstName}
                    {...field}
                    className={cn(
                      form.formState.errors.firstName && 'border-red-400 focus-visible:ring-red-400',
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
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name:</FormLabel>

                <FormControl>
                  <Input
                    placeholder={user.lastName}
                    {...field}
                    className={cn(
                      form.formState.errors.lastName && 'border-red-400 focus-visible:ring-red-400',
                      'pr-8'
                    )}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <FormField
            control={form.control}
            name='birthday'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth:</FormLabel>

                <FormControl>
                  <Input
                    placeholder='Date of birth'
                    type='date'
                    {...field}
                    className={cn(
                      form.formState.errors.birthday && 'border-red-400 focus-visible:ring-red-400',
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
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender:</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl
                    className={cn(
                      form.formState.errors.birthday && 'border-red-400 focus-visible:ring-red-400',
                      'pr-8'
                    )}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Male' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='MALE'>Male</SelectItem>
                    <SelectItem value='FEMALE'>Female</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex items-center justify-between'>
          <Button type='submit' disabled={loading}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
