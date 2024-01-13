import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import Loading from '../loading/Loading';
import usePeople from '@/hooks/usePeople';
import { ROLE } from '@/constance/constance';
import StudentMapListTable from './StudentMapListTable';
import { useToast } from '../ui/use-toast';
import { StudentPreview } from '@/type';
import classApi from '@/api/classApi';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStudent: {
    student_id: string;
    student_name: string;
  };
};

const StudentMapDialog = ({ open, onOpenChange, currentStudent }: Props) => {
  const [chosenAccountId, setChosenAccountId] = useState('second');
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { people, isLoading } = usePeople();
  const { toast } = useToast();
  if (isLoading) <Loading />;
  if (!people) return null;

  if (!id) <Navigate to='/' />;

  const unMapList = people.filter((person) => person.user.student_id === null && person.role.code === ROLE.STUDENT);

  const mapStudent = async () => {
    try {
      const data: StudentPreview = {
        student_id: currentStudent.student_id,
        student_name: currentStudent.student_name,
        account_id: chosenAccountId,
        classroom_id: id!
      };
      const res = await classApi.mapStudentId([data]);
      if (res) {
        queryClient.invalidateQueries(['studentList', id]);
      }
      onOpenChange(false);
    } catch (error: any) {
      if (error?.response) {
        toast({
          title: error.response.data.error,
          variant: 'destructive'
        });
      }
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='lg:w-[1200px]'>
        <div className='w-full'>
          <StudentMapListTable students={unMapList} setChosenAccountId={setChosenAccountId} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='ghost'>
              Close
            </Button>
          </DialogClose>
          <Button type='submit' disabled={chosenAccountId === ''} onClick={mapStudent}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default StudentMapDialog;
