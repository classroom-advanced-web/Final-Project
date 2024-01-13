import classApi from '@/api/classApi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { createContext } from 'react';
import ClassNav from '../class/ClassNav';
import { Classroom } from '@/type';

type Props = {
  children: React.ReactNode;
  page: 'stream' | 'people' | 'grades' | 'structure' | 'student-list' | 'request-reviews';
};

type ContextType = {
  classDetail: Classroom;
  isLoading: boolean;
  updateClassDetail: (data: Classroom) => void;
};

export const ClassContext = createContext<ContextType | null>(null);

const ClassLayout = ({ children, page }: Props) => {
  const { id } = useParams<{ id: string }>() ?? '';
  const { data: classDetail, isLoading } = useQuery(['class', id], () => classApi.getClassDetail(id!), {
    refetchOnWindowFocus: false
  });

  const updateClassDetail = (data: Classroom) => {
    console.log(`data::::${JSON.stringify(data)}`);
  };

  const value = {
    classDetail,
    isLoading,
    updateClassDetail
  };

  return (
    <ClassContext.Provider value={value}>
      <ClassNav page={page} />
      {children}
    </ClassContext.Provider>
  );
};
export default ClassLayout;
