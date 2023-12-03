import authApi from '@/api/authApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Console } from 'console';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleForgotPasswordClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authApi.requestOtp({ email });
      console.log(res);
      navigate(`/forgot-password/redeem?email=${email}`, { state: { id: res.otp_id } });
    } catch (error: any) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-md bg-white px-6 py-8 shadow-md'>
        <h2 className='mb-4 text-2xl font-bold'>Forgot Password</h2>
        <form onSubmit={handleForgotPasswordClick} className='space-y-4'>
          <div>
            <label htmlFor='email' className='block font-medium'>
              Email
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              id='email'
              className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              placeholder='Enter your email'
            />
          </div>
          {error && <span className='mt-1 text-sm text-red-500'>{error}</span>}
          <Button
            disabled={loading}
            //onClick={handleForgotPasswordClick}
            type='submit'
            className='w-full rounded-md border border-transparent  px-4 py-2 text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            {loading ? 'Sending OTP' : 'Reset password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
