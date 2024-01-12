import { useClassroom } from '@/hooks/useClassroom';
import { writeExcelFile } from '@/lib/utils';
import Loading from '../loading/Loading';

import classApi from '@/api/classApi';
import { StudentPreview } from '@/type';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { RiFolderDownloadLine } from 'react-icons/ri';
import { read, utils } from 'xlsx';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

type Props = {
  students: StudentPreview[];
  setStudents: (students: StudentPreview[]) => void;
};

const StudentListAction = ({ students, setStudents }: Props) => {
  const { classDetail, isLoading } = useClassroom();
  const [file, setFile] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      if (!file) return;
      const f = await file.arrayBuffer();
      const wb = read(f);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = utils.sheet_to_json(ws);

      const invalidIndexes: number[] = [];
      const processedData = data.map((item: any, index) => {
        if (!item['Student ID']) {
          invalidIndexes.push(index + 2);
        }

        return {
          student_id: item['Student ID'],
          account_id: item['Account ID'] == '' ? null : item['Account ID'],
          student_name: item['Full Name'],
          classroom_id: classDetail.id
        };
      });

      if (invalidIndexes.length > 0) {
        const index = invalidIndexes.join(', ');
        toast({
          variant: 'destructive',
          title: `Invalid data at row ${index}`
        });
        return;
      }

      try {
        const res: StudentPreview[] = await classApi.mapStudentId(processedData);

        if (res) {
          const newData = [...students];
          res.reverse();
          res.forEach((student) => {
            if (newData.find((item) => item.student_id === student.student_id)) return;
            newData.unshift(student);
          });
          setStudents(newData);
        }
      } catch (error: any) {
        if (error?.response) {
          toast({
            variant: 'destructive',
            title: error.response.data.error
          });
        }
        console.error(error);
      }
    })();
  }, [file?.name]);

  if (isLoading) return <Loading />;
  if (!classDetail) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleExportExcel = () => {
    let data = [];
    if (students.length === 0) {
      data.push({
        'Account ID': '',
        'Student ID': '',
        'Full Name': ''
      });
    } else {
      data = students.map((student: StudentPreview) => {
        return {
          'Account ID': student.account_id ?? '',
          'Student ID': student.student_id,
          'Full Name': student.student_name
        };
      });
    }
    writeExcelFile(data, `students - ${classDetail.name}.xlsx`);
  };

  const handleImportExcel = () => {
    inputRef.current?.click();
  };

  return (
    <section className='flex items-center gap-2'>
      <Button variant={'outline'} className='flex items-center gap-3' onClick={handleExportExcel}>
        <span className='text-xl'>
          <RiFolderDownloadLine />
        </span>
        <span>Export to XLSX</span>
      </Button>

      <Button variant={'outline'} className='flex items-center gap-3' onClick={handleImportExcel}>
        <span className='text-xl'>
          <MdOutlineDriveFolderUpload />
        </span>
        <span>Import XLSX</span>

        <input
          type='file'
          ref={inputRef}
          onChange={(e) => {
            handleFileChange(e);
          }}
          className='hidden'
        />
      </Button>
    </section>
  );
};
export default StudentListAction;
