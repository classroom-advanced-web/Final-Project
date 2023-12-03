import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { resetPasswordSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { error } from 'console';
import { EyeOff, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const toggleShowPassword = () => {
    setShowPassword((prev: boolean) => !prev);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    console.log(data);
  };

  return (
    <div className='container'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      {...field}
                      className={cn(
                        form.formState.errors.password && 'border-red-400 focus-visible:ring-red-400',
                        'pr-8'
                      )}
                    />
                    <div
                      className='absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer hover:opacity-80'
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Confirm Password'
                      {...field}
                      className={cn(
                        form.formState.errors.password && 'border-red-400 focus-visible:ring-red-400',
                        'pr-8'
                      )}
                    />
                    <div
                      className='absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer hover:opacity-80'
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        <Button>Reset Password</Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
