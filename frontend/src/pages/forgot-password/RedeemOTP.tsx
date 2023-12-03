import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';

const RedeemOTP: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
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

  console.log(searchParams.get('email'));

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleRedeem = () => {
    // TODO: Implement redeem logic here
  };

  const handleResend = () => {
    setIsResendDisabled(true);
    setCountdown(60);
    // TODO: Implement resend logic here
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
      <Button onClick={handleResend} disabled={isResendDisabled} className='w-1/7 mt-4 rounded'>
        {isResendDisabled ? `Resend (${countdown})` : 'Resend'}
      </Button>
    </div>
  );
};

export default RedeemOTP;
