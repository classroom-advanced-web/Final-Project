import ClassNav from '@/components/class/ClassNav';
import { useParams } from 'react-router-dom';

const ClassworkPage = () => {
  const { id } = useParams();
  return (
    <div>
      <ClassNav page='classwork' />
    </div>
  );
};
export default ClassworkPage;
