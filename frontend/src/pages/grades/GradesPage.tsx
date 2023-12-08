import ClassNav from '@/components/class/ClassNav';
import { useParams } from 'react-router-dom';

const GradesPage = () => {
  const { id } = useParams();
  return (
    <div>
      <ClassNav page='grades' />
      {id}
    </div>
  );
};
export default GradesPage;
