import { useAuth } from '@/hooks/useAuth';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '../ui/button';

const SocialLogins = () => {
  const { loginWithGoogle, loadUser } = useAuth();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await loginWithGoogle(tokenResponse.access_token);
        await loadUser();
      } catch (error) {
        console.log(error);
      }
    },
    scope: 'profile',
    onError: (error) => console.log(error)
  });
  return (
    <section className='flex flex-col items-center justify-center '>
      <h2 className='mb-4 text-2xl font-bold'>Or continue with</h2>
      <div className='flex w-full max-w-[320px] items-center space-x-4'>
        <Button
          className='flex w-full items-center space-x-2'
          onClick={() => {
            googleLogin();
          }}
        >
          <img src='https://img.icons8.com/color/48/000000/google-logo.png' alt='google' className='h-6 w-6' />
          <span>Login with Google</span>
        </Button>
      </div>
    </section>
  );
};
export default SocialLogins;
