import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';

import authApi from '@/api/authApi';
import { useToast } from '@/components/ui/use-toast';

const RedeemOTP = () => {
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0 && isResendDisabled) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
    }

    return () => clearTimeout(timer);
  }, [countdown, isResendDisabled]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state } = useLocation();

  const { id, accessToken } = state;

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  if (!searchParams.get('email')) {
    console.log('No email found in search params');
    return <Navigate to={'/forgot-password'} />;
  }

  if (!searchParams.get('action')) {
    return <Navigate to={'/login'} />;
  }

  const action = searchParams.get('action');

  const handleRedeem = async () => {
    setIsVerifying(true);
    try {
      if (action === 'activate') {
        const res = await authApi.verifyEmail({ token: accessToken, email: searchParams.get('email') ?? '' });
        if (res) {
          toast({
            title: 'Account activated',
            description: 'Your account has been activated.'
          });
          navigate('/profile');
        }
      } else if (action === 'forgot-password') {
        const res = await authApi.verifyOtp({ id, otp, token: accessToken, email: searchParams.get('email') ?? '' });
        console.log(res);
        navigate(`/forgot-password/reset?email=${searchParams.get('email')}`, {
          state: { accessToken }
        });
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.message) setError(error.response?.data?.message);
      else setError(error.response?.data?.error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResendDisabled(true);
    setCountdown(60);
    // TODO: Implement resend logic here

    try {
      setLoading(true);
      const email: string = searchParams.get('email') ?? '';
      const res = await authApi.requestOtp({ email });
      console.log(res);
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
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='mb-4 text-2xl font-bold'>Redeem OTP</h1>
      <input
        type='text'
        value={otp}
        onChange={handleOtpChange}
        className='rounded-md border border-gray-300 px-4 py-2'
        placeholder='Enter OTP'
      />
      {error && <span className='mb-2 text-sm text-red-500'>{error}</span>}

      <Button disabled={isVerifying} onClick={handleRedeem} className='w-1/7 mt-2 rounded'>
        {isVerifying ? 'Verifying' : 'Redeem'}
      </Button>
      <Button onClick={handleResend} disabled={isResendDisabled || loading} className='w-1/7 mt-4 rounded'>
        {isResendDisabled ? `Resend (${countdown})` : 'Resend'}
      </Button>
    </div>
  );
};

export default RedeemOTP;
