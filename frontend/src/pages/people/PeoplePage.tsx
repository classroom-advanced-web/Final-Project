import ClassNav from '@/components/class/ClassNav';
import { useParams } from 'react-router-dom';

const PeoplePage = () => {
  const { id } = useParams();
  return (
    <div>
      <ClassNav page='people' />
      {id}
    </div>
  );
};
export default PeoplePage;
