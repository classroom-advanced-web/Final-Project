import { useClassroom } from '@/hooks/useClassroom';
import { writeExcelFile } from '@/lib/utils';
import Loading from '../loading/Loading';

import classApi from '@/api/classApi';
import { GradeBoard, GradeComposition, StudentGrades, StudentPreview } from '@/type';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { RiFolderDownloadLine } from 'react-icons/ri';
import { read, utils } from 'xlsx';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import gradeApi from '@/api/gradeApi';
import { useQueryClient } from 'react-query';
import { ErrorResponse } from 'react-router-dom';

type Props = {
  gradeComposition: GradeComposition[];
  gradeBoard: StudentGrades[];
};

const GradeAction = ({ gradeBoard, gradeComposition }: Props) => {
  const { classDetail, isLoading } = useClassroom();
  const [file, setFile] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

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

        let grades = gradeComposition.map((composition) => {
          return {
            grade_composition: {
              id: composition.id
            },
            value: item[composition.name] === '' ? null : item[composition.name]
          };
        });

        return {
          student_id: item['Student ID'],
          grades
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
        const res = await gradeApi.importGrades(processedData);
        if (res) {
          toast({
            title: 'Import successfully'
          });
          queryClient.invalidateQueries(['gradeBoard', gradeComposition[0].classroom_id]);
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

    if (gradeBoard.length === 0) {
      let compositionName: any = {};
      gradeComposition.forEach((composition) => {
        compositionName[composition.name] = '';
      });
      data.push({
        'Student ID': '',
        ...compositionName
      });
    } else {
      let compositionName: any = {};
      for (let i = 0; i < gradeBoard.length; i++) {
        compositionName = {};
        for (let j = 0; j < gradeBoard[i].grades.length; j++) {
          compositionName[gradeBoard[i].grades[j].grade_composition.name] = gradeBoard[i].grades[j].id
            ? gradeBoard[i].grades[j].value
            : '';
        }
        data.push({
          'Student ID': gradeBoard[i].student_id,
          ...compositionName
        });
      }
    }
    writeExcelFile(data, `grades - ${classDetail.name}.xlsx`);
  };

  const handleImportExcel = () => {
    inputRef.current?.click();
  };

  return (
    <section className='container flex items-center justify-end gap-2 py-3'>
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
export default GradeAction;
