import { useAuth } from '@/hooks/useAuth';
import './loading-overlay.css';

const LoadingOverlay = () => {
  const { loading } = useAuth();
  return (
    loading && (
      <div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center'>
        <div className='absolute h-full w-full bg-gray-900 opacity-50'></div>
        <div className='flex flex-col items-center rounded-lg border bg-white px-5 py-2'>
          <div className='loader-dots relative mt-2 block h-5 w-20'>
            <div className='absolute top-0 mt-1 h-3 w-3 rounded-full bg-indigo-500'></div>
            <div className='absolute top-0 mt-1 h-3 w-3 rounded-full bg-indigo-500'></div>
            <div className='absolute top-0 mt-1 h-3 w-3 rounded-full bg-indigo-500'></div>
            <div className='absolute top-0 mt-1 h-3 w-3 rounded-full bg-indigo-500'></div>
          </div>
          <div className='mt-2 text-center text-xs font-light text-gray-500'>Please wait...</div>
        </div>
      </div>
    )
  );
};
export default LoadingOverlay;
