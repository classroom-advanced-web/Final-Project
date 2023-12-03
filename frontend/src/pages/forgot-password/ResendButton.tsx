import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useEffect } from 'react';

const ResendOTP: React.FC = () => {
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

  const handleResend = () => {
    setIsResendDisabled(true);
    setCountdown(60);
    // TODO: Implement resend logic here
  };

  return (
    <Button onClick={handleResend} disabled={isResendDisabled} className='w-1/7 mt-4 rounded'>
      {isResendDisabled ? `Resend (${countdown})` : 'Resend'}
    </Button>
  );
};

export default ResendOTP;
