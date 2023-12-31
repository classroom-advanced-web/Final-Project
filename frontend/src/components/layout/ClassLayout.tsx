import classApi from '@/api/classApi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { createContext } from 'react';
import ClassNav from '../class/ClassNav';

type Props = {
  children: React.ReactNode;
  page: 'stream' | 'people' | 'grades' | 'structure';
};

type ContextType = {
  classDetail: Classroom;
  isLoading: boolean;
};

export const ClassContext = createContext<ContextType | null>(null);

const ClassLayout = ({ children, page }: Props) => {
  const { id } = useParams<{ id: string }>() ?? '';
  const { data: classDetail, isLoading } = useQuery('class', () => classApi.getClassDetail(id!), {
    refetchOnWindowFocus: false
  });

  const value = {
    classDetail,
    isLoading
  };

  return (
    <ClassContext.Provider value={value}>
      <ClassNav page={page} />
      {children}
    </ClassContext.Provider>
  );
};
export default ClassLayout;
