import ClassNav from '@/components/class/ClassNav';
import { useParams } from 'react-router-dom';

const ClassPage = () => {
  const { id } = useParams();
  return (
    <div>
      <ClassNav />
    </div>
  );
};
export default ClassPage;
