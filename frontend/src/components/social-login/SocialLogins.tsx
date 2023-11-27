import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '../ui/button';

const SocialLogins = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    scope: ['profile', 'email'].join(' '),
    onError: (error) => console.log(error)
  });
  return (
    <section className='flex flex-col items-center justify-center '>
      <h2 className='mb-4 text-2xl font-bold'>Or continue with</h2>
      <div className='flex items-center space-x-4'>
        <Button
          className='flex items-center space-x-2'
          onClick={() => {
            googleLogin();
          }}
        >
          <img src='https://img.icons8.com/color/48/000000/google-logo.png' alt='google' className='h-6 w-6' />
          <span>Google</span>
        </Button>
        <Button className='flex items-center space-x-2' onClick={() => {}}>
          <img src='https://img.icons8.com/color/50/000000/facebook.png' alt='facebook' className='h-6 w-6' />
          <span>Facebook</span>
        </Button>
      </div>
    </section>
  );
};
export default SocialLogins;
