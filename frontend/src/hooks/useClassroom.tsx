import { ClassContext } from '@/components/layout/ClassLayout';
import { useContext } from 'react';

export const useClassroom = () => {
  const context = useContext(ClassContext);

  if (!context) {
    throw new Error('useClassroom must be used within an ClassProvider');
  }

  return context;
};
