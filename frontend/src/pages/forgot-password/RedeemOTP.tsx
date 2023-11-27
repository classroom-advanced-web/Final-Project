import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const RedeemOTP: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get('email'));

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleRedeem = () => {
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
      <Button onClick={handleRedeem} className='rounded '>
        Redeem
      </Button>
    </div>
  );
};

export default RedeemOTP;
