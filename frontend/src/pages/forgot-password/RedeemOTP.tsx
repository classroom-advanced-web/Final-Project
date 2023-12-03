import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';
import ResendOTP from './ResendButton';

const RedeemOTP = () => {
  const [otp, setOtp] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();
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

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  if (!searchParams.get('email')) {
    console.log('No email found in search params');
    return <Navigate to={'/forgot-password'} />;
  }

  const handleRedeem = () => {
    navigate(`/forgot-password/reset?email=${searchParams.get('email')}`);
    // TODO: Implement redeem logic here
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='mb-4 text-2xl font-bold'>Redeem OTP</h1>
      <input
        type='text'
        value={otp}
        onChange={handleOtpChange}
        className='mb-4 rounded-md border border-gray-300 px-4 py-2'
        placeholder='Enter OTP'
      />
      <Button onClick={handleRedeem} className='w-1/7 rounded'>
        Redeem
      </Button>
      <ResendOTP />
    </div>
  );
};

export default RedeemOTP;
